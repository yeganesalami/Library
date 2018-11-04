from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=50)
    desc = models.TextField()
    author = models.CharField()

    def __str__(self):
        return self.title