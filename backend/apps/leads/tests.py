from unittest.mock import patch

from django.test import SimpleTestCase

from .emails import send_lead_emails
from .serializers import QuoteRequestSerializer


class SendLeadEmailsTests(SimpleTestCase):
    @patch("apps.leads.emails.queue_lead_email_delivery.delay")
    def test_send_lead_emails_queues_background_delivery(self, queue_mock):
        send_lead_emails(
            form_type="Callback Request",
            owner_subject="New Callback Request",
            customer_email="customer@example.com",
            customer_name="Customer",
            fields={"full_name": "Customer"},
        )

        queue_mock.assert_called_once_with(
            form_type="Callback Request",
            owner_subject="New Callback Request",
            customer_email="customer@example.com",
            customer_name="Customer",
            fields={"full_name": "Customer"},
        )


class QuoteRequestSerializerTests(SimpleTestCase):
    def test_serializer_accepts_frontend_alias_fields_and_maps_them(self):
        serializer = QuoteRequestSerializer(
            data={
                "full_name": "Jane Doe",
                "company_name": "Acme Ltd",
                "corporate_email": "jane@example.com",
                "direct_contact": "+971501234567",
                "required_solution": "Ultrasonic Cleaning",
                "facility_location": "Dubai",
                "project_scope": "Need a custom solution for our facility.",
            }
        )

        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data["email"], "jane@example.com")
        self.assertEqual(serializer.validated_data["phone"], "+971501234567")
        self.assertEqual(serializer.validated_data["service"], "Ultrasonic Cleaning")
        self.assertEqual(serializer.validated_data["location"], "Dubai")
        self.assertEqual(
            serializer.validated_data["project_details"],
            "Need a custom solution for our facility.",
        )

    def test_serializer_returns_field_errors_for_frontend_aliases(self):
        serializer = QuoteRequestSerializer(
            data={
                "full_name": "Jane Doe",
                "company_name": "Acme Ltd",
                "required_solution": "",
                "facility_location": "",
                "project_scope": "",
            }
        )

        self.assertFalse(serializer.is_valid())
        self.assertIn("corporate_email", serializer.errors)
        self.assertIn("direct_contact", serializer.errors)
        self.assertIn("required_solution", serializer.errors)
        self.assertIn("facility_location", serializer.errors)
