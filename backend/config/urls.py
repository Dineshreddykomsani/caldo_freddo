from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("apps.company.urls")),
    path("api/", include("apps.products.urls")),
    path("api/", include("apps.services.urls")),
    path("api/", include("apps.leads.urls")),
]
