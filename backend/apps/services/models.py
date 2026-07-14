from django.db import models

from apps.common.models import TimeStampedModel


class Service(TimeStampedModel):
    slug = models.SlugField(max_length=160, unique=True)
    title = models.CharField(max_length=150)
    description = models.TextField()
    long_description = models.TextField(blank=True)
    icon_name = models.CharField(max_length=60, blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    features = models.JSONField(default=list, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order", "title"]
        indexes = [
            models.Index(fields=["is_active", "display_order"]),
        ]

    def __str__(self):
        return self.title
