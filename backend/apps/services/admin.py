from django.contrib import admin

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "display_order", "is_active", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("title", "slug", "description", "long_description")
    ordering = ("display_order", "title")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
