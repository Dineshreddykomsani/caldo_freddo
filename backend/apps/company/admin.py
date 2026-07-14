from django.contrib import admin

from .models import Company, Industry, Partner, Testimonial


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("company_name", "email", "phone", "updated_at")
    search_fields = ("company_name", "email", "phone", "whatsapp")
    ordering = ("company_name",)
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (
            "Company",
            {
                "fields": (
                    "company_name",
                    "email",
                    "phone",
                    "whatsapp",
                    "address",
                    "google_maps_url",
                )
            },
        ),
        (
            "Social Media",
            {
                "fields": (
                    "facebook_url",
                    "linkedin_url",
                    "instagram_url",
                    "youtube_url",
                )
            },
        ),
        ("Audit", {"fields": ("created_at", "updated_at")}),
    )


@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "display_order", "is_active", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("name", "slug", "description")
    ordering = ("display_order", "name")
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("created_at", "updated_at")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("author", "company", "tag", "rating", "display_order", "is_active")
    list_filter = ("is_active", "rating", "tag")
    search_fields = ("quote", "author", "company", "location", "tag")
    ordering = ("display_order", "author")
    readonly_fields = ("created_at", "updated_at")


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ("name", "display_order", "is_active", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("name",)
    ordering = ("display_order", "name")
    readonly_fields = ("created_at", "updated_at")
