from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .emails import send_lead_emails
from .serializers import (
    CallbackRequestSerializer,
    ContactMessageSerializer,
    QuoteRequestSerializer,
)


def success_response(message, serializer):
    return Response(
        {
            "success": True,
            "message": message,
            "data": serializer.data,
        },
        status=status.HTTP_201_CREATED,
    )


class CallbackRequestCreateAPIView(APIView):
    def post(self, request):
        serializer = CallbackRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()
        send_lead_emails(
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
        return success_response("Callback request submitted successfully.", serializer)


class QuoteRequestCreateAPIView(APIView):
    def post(self, request):
        serializer = QuoteRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()
        send_lead_emails(
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
        return success_response("Quote request submitted successfully.", serializer)


class ContactMessageCreateAPIView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()
        send_lead_emails(
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
        return success_response("Contact message submitted successfully.", serializer)
