import logging
from collections import OrderedDict

import resend
from django.conf import settings
from django.utils import timezone


logger = logging.getLogger(__name__)


class EmailDeliveryError(Exception):
    pass


def _format_label(field_name):
    return field_name.replace("_", " ").title()


def _format_owner_body(form_type, fields):
    submitted_at = timezone.localtime(timezone.now()).strftime("%Y-%m-%d %H:%M:%S %Z")
    lines = ["Form Type", form_type, "", "----------------------------------", ""]

    for key, value in fields.items():
        display_value = value if value not in (None, "") else "-"
        lines.extend([_format_label(key), str(display_value), ""])

    lines.extend(["Submission Time", submitted_at])
    return "\n".join(lines)


def _customer_body(customer_name):
    name = customer_name or "Customer"
    return "\n".join(
        [
            f"Dear {name},",
            "",
            "Thank you for contacting Caldo Freddo.",
            "",
            "Your enquiry has been received successfully.",
            "",
            "Our team will review your request and contact you shortly.",
            "",
            "Regards",
            "Caldo Freddo Team",
        ]
    )


def _send_resend_email(*, subject, message, recipient):
    if not settings.RESEND_API_KEY:
        raise EmailDeliveryError("RESEND_API_KEY is not configured.")
    if not settings.RESEND_FROM_EMAIL:
        raise EmailDeliveryError("RESEND_FROM_EMAIL is not configured.")
    if not recipient:
        raise EmailDeliveryError("Email recipient is not configured.")

    resend.api_key = settings.RESEND_API_KEY
    try:
        resend.Emails.send(
            {
                "from": settings.RESEND_FROM_EMAIL,
                "to": [recipient],
                "subject": subject,
                "text": message,
            }
        )
    except Exception as exc:
        logger.exception("Resend failed to send email to %s.", recipient)
        raise EmailDeliveryError("Unable to send email through Resend.") from exc


def send_lead_emails(*, form_type, owner_subject, customer_email, customer_name, fields):
    logger.info("Sending lead emails for %s", form_type)
    owner_email = getattr(settings, "OWNER_EMAIL", "")
    if not owner_email:
        raise EmailDeliveryError("OWNER_EMAIL is not configured.")

    ordered_fields = OrderedDict(fields)

    _send_resend_email(
        subject="Thank You for Contacting Caldo Freddo",
        message=_customer_body(customer_name),
        recipient=customer_email,
    )
    _send_resend_email(
        subject=owner_subject,
        message=_format_owner_body(form_type, ordered_fields),
        recipient=owner_email,
    )
    logger.info("Lead emails sent for %s", form_type)
