from django.db import models


class Book(models.Model):
    Title = models.CharField(max_length=255)
    Author = models.CharField(max_length=255)
    Category = models.CharField(max_length=255)
    Free = models.BooleanField(default=True)
    Description = models.CharField(max_length=255)

    def __str__(self):
        return self.Title