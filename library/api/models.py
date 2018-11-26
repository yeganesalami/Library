from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    free = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Author(models.Model):
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    birthday = models.DateField()
    born = models.CharField(max_length=255)
    kind = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.name
