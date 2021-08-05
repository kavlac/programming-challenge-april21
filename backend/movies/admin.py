from django.contrib import admin
from numpy import mod
from movies import models

# Register your models here.
admin.register(models.Film)
admin.register(models.FilmLink)
admin.register(models.Rating)