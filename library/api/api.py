from rest_framework import viewsets, permissions

from .models import Book,Author,Member,Borrow
from .serializers import BookSerializer,AuthorSerializer,MemberSerializer,BorrowSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = BookSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = AuthorSerializer


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = MemberSerializer

class BorrowViewSet(viewsets.ModelViewSet):
    queryset = Borrow.objects.all()
    permission_classes=[permissions.AllowAny,]
    serializer_class=BorrowSerializer