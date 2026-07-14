import logging

from .tasks import queue_lead_email_delivery


logger = logging.getLogger(__name__)


def send_lead_emails(*, form_type, owner_subject, customer_email, customer_name, fields):
    logger.info("Queuing email delivery for %s", form_type)
    queue_lead_email_delivery.delay(
        form_type=form_type,
        owner_subject=owner_subject,
        customer_email=customer_email,
        customer_name=customer_name,
        fields=fields,
    )
