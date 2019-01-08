from rest_framework import serializers
from .models import Book, Author, Member,Borrow


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'description', 'free', 'category')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'gender', 'birthday',
                  'born', 'kind', 'description')


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id', 'memberId', 'firstName', 'lastName','fatherName','melliCode',
                  'memberDate', 'expirationDate', )

class BorrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrow
        fields = ('id','bookId','memberId','borrowedDate',)