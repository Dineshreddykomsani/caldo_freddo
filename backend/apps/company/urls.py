from django.urls import path

from .views import (
    CompanyDetailAPIView,
    IndustryListAPIView,
    PartnerListAPIView,
    TestimonialListAPIView,
)


urlpatterns = [
    path("company/", CompanyDetailAPIView.as_view(), name="company-detail"),
    path("industries/", IndustryListAPIView.as_view(), name="industry-list"),
    path("testimonials/", TestimonialListAPIView.as_view(), name="testimonial-list"),
    path("partners/", PartnerListAPIView.as_view(), name="partner-list"),
]
