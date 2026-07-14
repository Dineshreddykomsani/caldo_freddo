from django.db import migrations, models

import apps.common.validators


class Migration(migrations.Migration):
    dependencies = [
        ("leads", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="callbackrequest",
            name="gcc_country",
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name="quoterequest",
            name="location",
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.CreateModel(
            name="ContactMessage",
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
                ("name", models.CharField(max_length=120)),
                ("company", models.CharField(blank=True, max_length=160)),
                ("email", models.EmailField(max_length=254)),
                (
                    "phone",
                    models.CharField(
                        max_length=20,
                        validators=[apps.common.validators.phone_validator],
                    ),
                ),
                ("product", models.CharField(blank=True, max_length=180)),
                ("query", models.TextField()),
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
                        name="leads_conta_status_bc65ea_idx",
                    ),
                    models.Index(fields=["email"], name="leads_conta_email_888a50_idx"),
                    models.Index(fields=["phone"], name="leads_conta_phone_d526b4_idx"),
                ],
            },
        ),
    ]
