from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("company", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Industry",
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
                ("slug", models.SlugField(max_length=140, unique=True)),
                ("name", models.CharField(max_length=160)),
                ("description", models.TextField()),
                ("icon_name", models.CharField(blank=True, max_length=60)),
                ("background_image_url", models.URLField(blank=True, max_length=500)),
                ("display_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Industry",
                "verbose_name_plural": "Industries",
                "ordering": ["display_order", "name"],
                "indexes": [
                    models.Index(
                        fields=["is_active", "display_order"],
                        name="company_ind_is_acti_de6d6a_idx",
                    ),
                ],
            },
        ),
        migrations.CreateModel(
            name="Partner",
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
                ("display_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "ordering": ["display_order", "name"],
                "indexes": [
                    models.Index(
                        fields=["is_active", "display_order"],
                        name="company_par_is_acti_a7fe20_idx",
                    ),
                ],
            },
        ),
        migrations.CreateModel(
            name="Testimonial",
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
                ("quote", models.TextField()),
                ("author", models.CharField(max_length=140)),
                ("company", models.CharField(max_length=160)),
                ("location", models.CharField(blank=True, max_length=120)),
                ("rating", models.PositiveSmallIntegerField(default=5)),
                ("tag", models.CharField(blank=True, max_length=120)),
                ("display_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "ordering": ["display_order", "author"],
                "indexes": [
                    models.Index(
                        fields=["is_active", "display_order"],
                        name="company_tes_is_acti_26c67e_idx",
                    ),
                ],
            },
        ),
    ]
