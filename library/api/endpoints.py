from django.conf.urls import include,url
from rest_framework import routers

from .api import BookViewSet,AuthorViewSet

router = routers.DefaultRouter()
router.register('books',BookViewSet)
router.register('authors',AuthorViewSet)
router.register('members',AuthorViewSet)


urlpatterns =[
    url("^",include(router.urls)),
]