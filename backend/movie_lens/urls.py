
# Configurations
from django.contrib import admin
from django.urls import path
from django.shortcuts import redirect
from django.urls import path, reverse, include
from rest_framework.routers import DefaultRouter

# Viewsets
from movies.api import viewsets as movies

routers = DefaultRouter()

# Routers
routers.register(r'film', movies.FilmViewSet)
routers.register(r'film-link', movies.FilmLinkTagViewSet)
routers.register(r'rating', movies.RatingViewSet)

urlpatterns = [
    path('', lambda request: redirect(reverse('api-root'))),
    path('api/', include(routers.urls), name='api-root'),
    path('admin/', admin.site.urls),
]
