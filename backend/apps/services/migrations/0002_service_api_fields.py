from django.db import migrations, models
from django.utils.text import slugify


def populate_service_slugs(apps, schema_editor):
    Service = apps.get_model("services", "Service")
    used = set()
    for service in Service.objects.order_by("display_order", "id"):
        base = slugify(service.title) or f"service-{service.pk}"
        slug = base
        counter = 2
        while slug in used or Service.objects.exclude(pk=service.pk).filter(slug=slug).exists():
            slug = f"{base}-{counter}"
            counter += 1
        service.slug = slug
        service.save(update_fields=["slug"])
        used.add(slug)


class Migration(migrations.Migration):
    dependencies = [
        ("services", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="service",
            name="slug",
            field=models.CharField(default="", max_length=160),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="service",
            name="long_description",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="service",
            name="icon_name",
            field=models.CharField(blank=True, max_length=60),
        ),
        migrations.AddField(
            model_name="service",
            name="image_url",
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name="service",
            name="features",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.RunPython(populate_service_slugs, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="service",
            name="slug",
            field=models.SlugField(max_length=160, unique=True),
        ),
    ]
