import logging
from collections import OrderedDict

from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone

logger = logging.getLogger(__name__)


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


@shared_task(bind=True, autoretry_for=(Exception,), retry_kwargs={"max_retries": 5, "countdown": 30}, retry_backoff=True)
def send_owner_notification_email(self, *, form_type, owner_subject, fields):
    logger.info("Task Started: owner notification for %s", form_type)
    owner_email = getattr(settings, "OWNER_EMAIL", "")
    if not owner_email:
        logger.error("OWNER_EMAIL is not configured; enquiry email was not sent for %s.", form_type)
        return

    ordered_fields = OrderedDict(fields)
    try:
        send_mail(
            subject=owner_subject,
            message=_format_owner_body(form_type, ordered_fields),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[owner_email],
            fail_silently=False,
        )
    except Exception:
        logger.exception("Task Failed: owner notification for %s.", form_type)
        raise

    logger.info("Task Completed: owner notification for %s", form_type)


@shared_task(bind=True, autoretry_for=(Exception,), retry_kwargs={"max_retries": 5, "countdown": 30}, retry_backoff=True)
def send_customer_confirmation_email(self, *, form_type, customer_email, customer_name):
    logger.info("Task Started: customer confirmation for %s", form_type)
    if not customer_email:
        logger.info("No customer email provided for %s; acknowledgement skipped.", form_type)
        return

    try:
        send_mail(
            subject="Thank You for Contacting Caldo Freddo",
            message=_customer_body(customer_name),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[customer_email],
            fail_silently=False,
        )
    except Exception:
        logger.exception("Task Failed: customer confirmation for %s.", form_type)
        raise

    logger.info("Task Completed: customer confirmation for %s", form_type)


@shared_task
def queue_lead_email_delivery(*, form_type, owner_subject, customer_email, customer_name, fields):
    logger.info("Task Queued: lead email delivery for %s", form_type)
    send_owner_notification_email.delay(
        form_type=form_type,
        owner_subject=owner_subject,
        fields=fields,
    )
    send_customer_confirmation_email.delay(
        form_type=form_type,
        customer_email=customer_email,
        customer_name=customer_name,
    )
