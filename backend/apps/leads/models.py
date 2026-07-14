from django.db import models

from apps.common.choices import LeadStatus
from apps.common.validators import phone_validator


class CallbackRequest(models.Model):
    full_name = models.CharField(max_length=120)
    gcc_country = models.CharField(max_length=10, blank=True)
    phone = models.CharField(max_length=20, validators=[phone_validator])
    email = models.EmailField(max_length=254, blank=True)
    service = models.CharField(max_length=150)
    message = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=LeadStatus.choices,
        default=LeadStatus.NEW,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status", "created_at"]),
            models.Index(fields=["phone"]),
        ]

    def __str__(self):
        return f"{self.full_name} - {self.phone}"


class QuoteRequest(models.Model):
    full_name = models.CharField(max_length=120)
    company_name = models.CharField(max_length=160, blank=True)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=20, validators=[phone_validator])
    service = models.CharField(max_length=150)
    location = models.CharField(max_length=120, blank=True)
    project_details = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=LeadStatus.choices,
        default=LeadStatus.NEW,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status", "created_at"]),
            models.Index(fields=["email"]),
            models.Index(fields=["phone"]),
        ]

    def __str__(self):
        return f"{self.full_name} - {self.service}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    company = models.CharField(max_length=160, blank=True)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=20, validators=[phone_validator])
    product = models.CharField(max_length=180, blank=True)
    query = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=LeadStatus.choices,
        default=LeadStatus.NEW,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status", "created_at"]),
            models.Index(fields=["email"]),
            models.Index(fields=["phone"]),
        ]

    def __str__(self):
        return f"{self.name} - {self.email}"
