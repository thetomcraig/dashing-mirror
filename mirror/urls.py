from django.conf.urls import include, url
from django.contrib import admin
from dashing.utils import router

urlpatterns = [
    url(r'^dashing/', include('dashing.urls')),
    url(r'^admin/', admin.site.urls),
]
