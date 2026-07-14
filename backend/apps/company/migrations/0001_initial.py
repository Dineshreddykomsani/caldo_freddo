# Generated for Caldo Freddo backend.
from django.db import migrations, models

import apps.common.validators


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Company",
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
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("company_name", models.CharField(max_length=150)),
                ("email", models.EmailField(max_length=254)),
                (
                    "phone",
                    models.CharField(
                        max_length=20,
                        validators=[apps.common.validators.phone_validator],
                    ),
                ),
                (
                    "whatsapp",
                    models.CharField(
                        blank=True,
                        max_length=20,
                        validators=[apps.common.validators.phone_validator],
                    ),
                ),
                ("address", models.TextField()),
                ("google_maps_url", models.URLField(blank=True, max_length=500)),
                ("facebook_url", models.URLField(blank=True, max_length=500)),
                ("linkedin_url", models.URLField(blank=True, max_length=500)),
                ("instagram_url", models.URLField(blank=True, max_length=500)),
                ("youtube_url", models.URLField(blank=True, max_length=500)),
            ],
            options={
                "verbose_name": "Company Information",
                "verbose_name_plural": "Company Information",
                "ordering": ["company_name"],
            },
        ),
    ]
