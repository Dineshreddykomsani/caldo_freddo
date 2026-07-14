from django.db import models

from apps.common.models import TimeStampedModel
from apps.common.validators import phone_validator


class Company(TimeStampedModel):
    company_name = models.CharField(max_length=150)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=20, validators=[phone_validator])
    whatsapp = models.CharField(
        max_length=20,
        blank=True,
        validators=[phone_validator],
    )
    address = models.TextField()
    google_maps_url = models.URLField(max_length=500, blank=True)
    facebook_url = models.URLField(max_length=500, blank=True)
    linkedin_url = models.URLField(max_length=500, blank=True)
    instagram_url = models.URLField(max_length=500, blank=True)
    youtube_url = models.URLField(max_length=500, blank=True)

    class Meta:
        verbose_name = "Company Information"
        verbose_name_plural = "Company Information"
        ordering = ["company_name"]

    def __str__(self):
        return self.company_name


class Industry(TimeStampedModel):
    slug = models.SlugField(max_length=140, unique=True)
    name = models.CharField(max_length=160)
    description = models.TextField()
    icon_name = models.CharField(max_length=60, blank=True)
    background_image_url = models.URLField(max_length=500, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Industry"
        verbose_name_plural = "Industries"
        ordering = ["display_order", "name"]
        indexes = [
            models.Index(fields=["is_active", "display_order"]),
        ]

    def __str__(self):
        return self.name


class Testimonial(TimeStampedModel):
    quote = models.TextField()
    author = models.CharField(max_length=140)
    company = models.CharField(max_length=160)
    location = models.CharField(max_length=120, blank=True)
    rating = models.PositiveSmallIntegerField(default=5)
    tag = models.CharField(max_length=120, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order", "author"]
        indexes = [
            models.Index(fields=["is_active", "display_order"]),
        ]

    def __str__(self):
        return f"{self.author} - {self.company}"


class Partner(TimeStampedModel):
    name = models.CharField(max_length=120, unique=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order", "name"]
        indexes = [
            models.Index(fields=["is_active", "display_order"]),
        ]

    def __str__(self):
        return self.name
