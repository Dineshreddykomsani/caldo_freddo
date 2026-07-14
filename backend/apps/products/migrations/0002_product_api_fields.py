from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("products", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="manufacturer_name",
            field=models.CharField(blank=True, max_length=160),
        ),
        migrations.AddField(
            model_name="product",
            name="manufacturer_url",
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name="product",
            name="image_url",
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name="product",
            name="competitors",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="product",
            name="is_own_product",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="product",
            name="is_own_service",
            field=models.BooleanField(default=False),
        ),
    ]
