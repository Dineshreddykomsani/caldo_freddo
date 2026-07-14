# Generated for Caldo Freddo backend.
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Service",
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
                ("title", models.CharField(max_length=150)),
                ("description", models.TextField()),
                ("display_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "ordering": ["display_order", "title"],
                "indexes": [
                    models.Index(
                        fields=["is_active", "display_order"],
                        name="services_se_is_acti_f7c341_idx",
                    ),
                ],
            },
        ),
    ]
