from django.contrib import admin

from .models import Product, ProductCategory


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "display_order", "is_active", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("name", "slug")
    ordering = ("display_order", "name")
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("created_at", "updated_at")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "display_order",
        "is_active",
        "updated_at",
    )
    list_filter = ("is_active", "category")
    search_fields = (
        "name",
        "short_description",
        "long_description",
        "manufacturer_name",
        "category__name",
    )
    ordering = ("display_order", "name")
    autocomplete_fields = ("category",)
    readonly_fields = ("created_at", "updated_at")
