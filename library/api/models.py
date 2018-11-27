from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    birthday = models.DateField()
    born = models.CharField(max_length=255)
    kind = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.name




class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.DO_NOTHING)
    description = models.CharField(max_length=255)
    free = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.title