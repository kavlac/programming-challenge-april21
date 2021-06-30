from django.core.management.base import BaseCommand
import numpy as np
from movies import models
import pandas as pd
import os


class Command(BaseCommand):
    help = 'Populating database'

    def handle(self, *args, **options):
        print('This process may take a few minutes...')
        self.film_mapper()


    def film_mapper(self):
        if(models.Film.objects.count() == 0):
            data = self.getDataSet('movies.csv')
            
            rows = data[data.columns[0]].count()
            print('Starting films create')
            for row in range(rows):

                id = data.loc[row,'movieId']

                if(models.Film.objects.filter(id=id).count() == 0):
                    title = data.loc[row, 'title']
                    genres = data.loc[row, 'genres']

                    models.Film.objects.create(
                        id=id,
                        title=title,
                        genres=genres
                        )

        self.link_mapper()


    def link_mapper(self):
        if(models.FilmLink.objects.count() == 0):
            data = self.getDataSet('links.csv')
            
            rows = data[data.columns[0]].count()
            
            print('Starting links create')
            for row in range(rows):
                film_id = data.loc[row, 'movieId']

                if(models.FilmLink.objects.filter(film_id=film_id).count() == 0):

                    imdb = self.verify(data.loc[row, 'imdbId'])
                    tmdb = self.verify(data.loc[row, 'tmdbId'])

                    models.FilmLink.objects.create(
                        film_id_id=film_id,
                        imdb_id=imdb,
                        tmdb_id=tmdb
                    )

        
        self.rating_mapper()


    def rating_mapper(self):
        if(models.Rating.objects.count() == 0):
            data = self.getDataSet('ratings.csv')

            lista = data.groupby('movieId', as_index=False).agg({'rating': 'mean'})

            rows = lista['movieId'].count()

            print('Starting rating create')
            for row in range(rows):

                movie_id = lista.loc[row, 'movieId']
                rating = lista.loc[row, 'rating']

                if(models.Rating.objects.filter(
                        film_id=movie_id, 
                        rating=rating).count() == 0):

                    models.Rating.objects.create(
                        film_id_id=movie_id,
                        rating=rating
                    )
        print('\nYour database has been successfully populated!')



 
    def getDataSet(self, file):
        cwd = os.getcwd()
        return pd.read_csv(cwd+"/assets/"+file)

    def verify(self, n1):
        if(np.isnan(n1)):
            return 0
        return n1