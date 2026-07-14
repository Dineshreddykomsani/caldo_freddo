# Generated for Caldo Freddo backend.
from django.db import migrations, models

import apps.common.validators


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="CallbackRequest",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("full_name", models.CharField(max_length=120)),
                (
                    "phone",
                    models.CharField(
                        max_length=20,
                        validators=[apps.common.validators.phone_validator],
                    ),
                ),
                ("email", models.EmailField(blank=True, max_length=254)),
                ("service", models.CharField(max_length=150)),
                ("message", models.TextField(blank=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("new", "New"),
                            ("contacted", "Contacted"),
                            ("closed", "Closed"),
                        ],
                        default="new",
                        max_length=20,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(
                        fields=["status", "created_at"],
                        name="leads_callb_status_4fd4e9_idx",
                    ),
                    models.Index(fields=["phone"], name="leads_callb_phone_108798_idx"),
                ],
            },
        ),
        migrations.CreateModel(
            name="QuoteRequest",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("full_name", models.CharField(max_length=120)),
                ("company_name", models.CharField(blank=True, max_length=160)),
                ("email", models.EmailField(max_length=254)),
                (
                    "phone",
                    models.CharField(
                        max_length=20,
                        validators=[apps.common.validators.phone_validator],
                    ),
                ),
                ("service", models.CharField(max_length=150)),
                ("project_details", models.TextField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("new", "New"),
                            ("contacted", "Contacted"),
                            ("closed", "Closed"),
                        ],
                        default="new",
                        max_length=20,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(
                        fields=["status", "created_at"],
                        name="leads_quote_status_fa39ea_idx",
                    ),
                    models.Index(fields=["email"], name="leads_quote_email_0e8748_idx"),
                    models.Index(fields=["phone"], name="leads_quote_phone_e027d3_idx"),
                ],
            },
        ),
    ]
