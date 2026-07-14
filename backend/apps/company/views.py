from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Company, Industry, Partner, Testimonial
from .serializers import (
    CompanySerializer,
    IndustrySerializer,
    PartnerSerializer,
    TestimonialSerializer,
)


class CompanyDetailAPIView(APIView):
    def get(self, request):
        company = Company.objects.order_by("-updated_at", "-id").first()
        if company is None:
            return Response(
                {
                    "success": False,
                    "message": "Company information is not available.",
                    "data": None,
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            {
                "success": True,
                "message": "Company information retrieved successfully.",
                "data": CompanySerializer(company).data,
            },
            status=status.HTTP_200_OK,
        )


class IndustryListAPIView(APIView):
    def get(self, request):
        industries = Industry.objects.filter(is_active=True).order_by(
            "display_order",
            "name",
        )
        return Response(
            {
                "success": True,
                "message": "Industries retrieved successfully.",
                "data": IndustrySerializer(industries, many=True).data,
            },
            status=status.HTTP_200_OK,
        )


class TestimonialListAPIView(APIView):
    def get(self, request):
        testimonials = Testimonial.objects.filter(is_active=True).order_by(
            "display_order",
            "author",
        )
        return Response(
            {
                "success": True,
                "message": "Testimonials retrieved successfully.",
                "data": TestimonialSerializer(testimonials, many=True).data,
            },
            status=status.HTTP_200_OK,
        )


class PartnerListAPIView(APIView):
    def get(self, request):
        partners = Partner.objects.filter(is_active=True).order_by(
            "display_order",
            "name",
        )
        return Response(
            {
                "success": True,
                "message": "Partners retrieved successfully.",
                "data": PartnerSerializer(partners, many=True).data,
            },
            status=status.HTTP_200_OK,
        )
