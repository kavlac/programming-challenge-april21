#Configuration
from rest_framework import viewsets
from movies import models
from movies.api import serializers
from django_filters.rest_framework import DjangoFilterBackend

# utils
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination


class FilmViewSet(viewsets.ModelViewSet):
    queryset = models.Film.objects.all()
    serializer_class = serializers.FilmSerializer
    filter_backends = (SearchFilter,)
    pagination_class = PageNumberPagination

    search_fields = ('id', 'title', 'genres')
    ordering_fields = '__all__'
    ordering = ('-id')


class FilmLinkTagViewSet(viewsets.ModelViewSet):
    queryset = models.FilmLink.objects.all()
    serializer_class = serializers.FilmLinkSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend)

    pagination_class = PageNumberPagination

    search_fields = ('film_id__title', 'film_id__genres')
    filter_fields = ['imdb_id', 'tmdb_id', 'film_id']

    ordering_fields = '__all__'
    ordering = ('-id')


class RatingViewSet(viewsets.ModelViewSet):
    queryset = models.Rating.objects.all()
    serializer_class = serializers.RatingSerializer

    filter_backends = (SearchFilter, DjangoFilterBackend)

    pagination_class = PageNumberPagination

    search_fields = ('film_id__title', 'film_id__genres')
    filter_fields = ['rating', 'id']

    ordering_fields = '__all__'
    ordering = ('-id')

