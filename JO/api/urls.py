from django.conf.urls import url,include
from django.contrib import admin
from api import views
from api.views import topic, news, auth

urlpatterns = [
    url(r'^login/', auth.LoginView.as_view()),
    # 话题
    url(r'^topic/$', topic.TopicView.as_view()),
    url(r'^news/$', news.NewsView.as_view()),
    url(r'^news/(?P<pk>\d+)/$', news.NewsDetailView.as_view()),

    url(r'^oss/credential/$', auth.OssCredentialView.as_view()),

    url(r'^comment/$', news.CommentView.as_view()),
]
