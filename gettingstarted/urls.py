from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import canvas.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', 'canvas.views.index'),
    url(r'^snow/', 'canvas.views.snow'),
]
