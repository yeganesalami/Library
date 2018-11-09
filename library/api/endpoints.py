from django.conf.urls import include,url
from rest_framework import routers

from .api import BookViewSet

router = routers.DefaultRouter()
router.register('books',BookViewSet)


urlpatterns =[
    url("^",include(router.urls)),
]