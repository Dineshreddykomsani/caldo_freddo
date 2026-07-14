from django.urls import path

from .views import (
    CallbackRequestCreateAPIView,
    ContactMessageCreateAPIView,
    QuoteRequestCreateAPIView,
)


urlpatterns = [
    path("callback/", CallbackRequestCreateAPIView.as_view(), name="callback-create"),
    path("quote/", QuoteRequestCreateAPIView.as_view(), name="quote-create"),
    path("contact/", ContactMessageCreateAPIView.as_view(), name="contact-create"),
]
