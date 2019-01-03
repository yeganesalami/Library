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


class Member(models.Model):
    memberId = models.CharField(max_length=255)
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    fatherName =models.CharField(max_length=255)
    melliCode =models.IntegerField()
    memberDate = models.DateField()
    expirationDate = models.DateField()

    def __str__(self):
        return self.memberId


class Borrow(models.Model):
    bookId = models.ForeignKey('Book', on_delete=models.DO_NOTHING)
    memberId = models.ForeignKey('Member', on_delete=models.DO_NOTHING)
    borrowedDate = models.DateTimeField(auto_now_add=True)