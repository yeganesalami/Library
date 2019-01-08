from django.conf.urls import include,url
from rest_framework import routers

from .api import BookViewSet,AuthorViewSet,MemberViewSet,BorrowViewSet

router = routers.DefaultRouter()
router.register('books',BookViewSet)
router.register('authors',AuthorViewSet)
router.register('members',MemberViewSet)
router.register('borrow',BorrowViewSet)


urlpatterns =[
    url("^",include(router.urls)),
]