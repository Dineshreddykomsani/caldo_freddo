from django.db import models

from apps.common.models import TimeStampedModel


class ProductCategory(TimeStampedModel):
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Product Category"
        verbose_name_plural = "Product Categories"
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name


class Product(TimeStampedModel):
    category = models.ForeignKey(
        ProductCategory,
        on_delete=models.PROTECT,
        related_name="products",
    )
    name = models.CharField(max_length=160)
    short_description = models.CharField(max_length=300)
    long_description = models.TextField()
    manufacturer_name = models.CharField(max_length=160, blank=True)
    manufacturer_url = models.URLField(max_length=500, blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    competitors = models.JSONField(default=list, blank=True)
    is_own_product = models.BooleanField(default=False)
    is_own_service = models.BooleanField(default=False)
    brochure_url = models.URLField(max_length=500, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order", "name"]
        indexes = [
            models.Index(fields=["is_active", "display_order"]),
            models.Index(fields=["category", "is_active"]),
        ]

    def __str__(self):
        return self.name
