from rest_framework import serializers
from movies import models

class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Film
        fields = '__all__'


class FilmLinkSerializer(serializers.ModelSerializer):
    film_id = FilmSerializer(many=False)

    class Meta: 
        model = models.FilmLink
        fields = '__all__'


class RatingSerializer(serializers.ModelSerializer):
    film_id = FilmSerializer(many=False)
    class Meta:
        model = models.Rating
        fields = '__all__'

