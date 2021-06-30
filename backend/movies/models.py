from django import db
from django.db import models
from numpy import mod


class Film(models.Model):
    id = models.IntegerField(
        db_column='id',
        primary_key=True
    )

    title = models.CharField(
        db_column='tx_title',
        default='',
        max_length=256,
        null=True,
        blank=True
    )

    genres = models.TextField(
        db_column='tx_genres',
        default='',
        max_length=256,
        null=True,
        blank=True
    )

    class Meta:
        managed = True
        db_table = 'film'
        ordering = ['-id']

    def __str__(self):
        return str(self.id)


class FilmLink(models.Model):

    film_id = models.OneToOneField(
        Film,
        on_delete=models.CASCADE,
        db_column='film_id',
    )

    imdb_id = models.IntegerField(
        db_column='imdb_id',
        default=0
    )

    tmdb_id = models.IntegerField(
        db_column='tmdb_id',
        default=0
    )

    class Meta:
        managed = True
        db_table = 'film_link'
        ordering = ['-id']
        
    def __str__(self):
        return self.film_id


class Rating(models.Model):

    film_id = models.ForeignKey(
        Film,
        on_delete=models.CASCADE,
        db_column='movie_id',
    )

    rating = models.FloatField(
        db_column="rating",
        default=0.0
    )

    class Meta:
        managed = True
        db_table = 'rating'
        ordering = ['-id']

    def __str__(self):
        return self.film_id
