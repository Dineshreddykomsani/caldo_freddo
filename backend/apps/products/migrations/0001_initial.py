# Generated for Caldo Freddo backend.
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ProductCategory",
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
                ("name", models.CharField(max_length=120, unique=True)),
                ("slug", models.SlugField(max_length=140, unique=True)),
                ("display_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Product Category",
                "verbose_name_plural": "Product Categories",
                "ordering": ["display_order", "name"],
            },
        ),
        migrations.CreateModel(
            name="Product",
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
                ("name", models.CharField(max_length=160)),
                ("short_description", models.CharField(max_length=300)),
                ("long_description", models.TextField()),
                ("brochure_url", models.URLField(blank=True, max_length=500)),
                ("display_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="products",
                        to="products.productcategory",
                    ),
                ),
            ],
            options={
                "ordering": ["display_order", "name"],
                "indexes": [
                    models.Index(
                        fields=["is_active", "display_order"],
                        name="products_pr_is_acti_c1981d_idx",
                    ),
                    models.Index(
                        fields=["category", "is_active"],
                        name="products_pr_categor_50f5f1_idx",
                    ),
                ],
            },
        ),
    ]
