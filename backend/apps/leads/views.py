import logging

from django.db import DatabaseError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .emails import EmailDeliveryError, send_lead_emails
from .serializers import (
    CallbackRequestSerializer,
    ContactMessageSerializer,
    QuoteRequestSerializer,
)


logger = logging.getLogger(__name__)


def success_response(message, serializer):
    return Response(
        {
            "success": True,
            "message": message,
            "data": serializer.data,
        },
        status=status.HTTP_201_CREATED,
    )


def error_response(message, field, detail, status_code):
    return Response(
        {
            "success": False,
            "message": message,
            "errors": {field: [detail]},
        },
        status=status_code,
    )


def save_enquiry(serializer):
    try:
        return serializer.save()
    except DatabaseError:
        logger.exception("Failed to save lead enquiry.")
        return None


def send_or_error(**kwargs):
    try:
        send_lead_emails(**kwargs)
    except EmailDeliveryError as exc:
        logger.exception("Failed to send lead emails.")
        return error_response(
            "Unable to send confirmation email.",
            "email",
            str(exc),
            status.HTTP_502_BAD_GATEWAY,
        )
    return None


class CallbackRequestCreateAPIView(APIView):
    def post(self, request):
        serializer = CallbackRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = save_enquiry(serializer)
        if enquiry is None:
            return error_response(
                "Unable to save callback request.",
                "database",
                "The callback request could not be saved.",
                status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        email_error = send_or_error(
            form_type="Callback Request",
            owner_subject="New Callback Request",
            customer_email=enquiry.email,
            customer_name=enquiry.full_name,
            fields={
                "full_name": enquiry.full_name,
                "phone_number": enquiry.phone,
                "business_email": enquiry.email,
                "gcc_country": enquiry.gcc_country,
                "interested_service": enquiry.service,
                "message": enquiry.message,
                "submission_time": enquiry.created_at,
            },
        )
        if email_error:
            return email_error
        return success_response("Callback request submitted successfully.", serializer)


class QuoteRequestCreateAPIView(APIView):
    def post(self, request):
        serializer = QuoteRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = save_enquiry(serializer)
        if enquiry is None:
            return error_response(
                "Unable to save quote request.",
                "database",
                "The quote request could not be saved.",
                status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        email_error = send_or_error(
            form_type="Commercial Quote",
            owner_subject="New Commercial Quote Request",
            customer_email=enquiry.email,
            customer_name=enquiry.full_name,
            fields={
                "name": enquiry.full_name,
                "company": enquiry.company_name,
                "email": enquiry.email,
                "phone": enquiry.phone,
                "service": enquiry.service,
                "location": enquiry.location,
                "requirements": enquiry.project_details,
                "submission_time": enquiry.created_at,
            },
        )
        if email_error:
            return email_error
        return success_response("Quote request submitted successfully.", serializer)


class ContactMessageCreateAPIView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = save_enquiry(serializer)
        if enquiry is None:
            return error_response(
                "Unable to save contact message.",
                "database",
                "The contact message could not be saved.",
                status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        email_error = send_or_error(
            form_type="Contact Message",
            owner_subject="New Contact Form Submission",
            customer_email=enquiry.email,
            customer_name=enquiry.name,
            fields={
                "name": enquiry.name,
                "company": enquiry.company,
                "email": enquiry.email,
                "phone": enquiry.phone,
                "product": enquiry.product,
                "query": enquiry.query,
                "submission_time": enquiry.created_at,
            },
        )
        if email_error:
            return email_error
        return success_response("Contact message submitted successfully.", serializer)
