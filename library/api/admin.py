from django.contrib import admin
from .models import Book, Author, Member,Borrow

# Register your models here.
admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Member)
admin.site.register(Borrow)
