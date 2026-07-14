from django.contrib import admin

from .models import CallbackRequest, ContactMessage, QuoteRequest


@admin.register(CallbackRequest)
class CallbackRequestAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "gcc_country",
        "phone",
        "email",
        "service",
        "status",
        "created_at",
    )
    list_filter = ("status", "service", "created_at")
    search_fields = ("full_name", "phone", "email", "service", "message")
    ordering = ("-created_at",)
    readonly_fields = (
        "full_name",
        "gcc_country",
        "phone",
        "email",
        "service",
        "message",
        "created_at",
    )
    fields = (
        "full_name",
        "gcc_country",
        "phone",
        "email",
        "service",
        "message",
        "status",
        "created_at",
    )


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "company_name",
        "email",
        "phone",
        "service",
        "status",
        "created_at",
    )
    list_filter = ("status", "service", "created_at")
    search_fields = (
        "full_name",
        "company_name",
        "email",
        "phone",
        "service",
        "location",
        "project_details",
    )
    ordering = ("-created_at",)
    readonly_fields = (
        "full_name",
        "company_name",
        "email",
        "phone",
        "service",
        "location",
        "project_details",
        "created_at",
    )
    fields = (
        "full_name",
        "company_name",
        "email",
        "phone",
        "service",
        "location",
        "project_details",
        "status",
        "created_at",
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "phone",
        "status",
        "created_at",
    )
    list_filter = ("status", "created_at")
    search_fields = ("name", "company", "email", "phone", "product", "query")
    ordering = ("-created_at",)
    readonly_fields = (
        "name",
        "company",
        "email",
        "phone",
        "product",
        "query",
        "created_at",
    )
    fields = (
        "name",
        "company",
        "email",
        "phone",
        "product",
        "query",
        "status",
        "created_at",
    )
