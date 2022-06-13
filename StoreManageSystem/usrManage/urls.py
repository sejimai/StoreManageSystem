from django.urls import path

from . import views

urlpatterns = [
  path('usrList', views.usr_list, name='usr')
]