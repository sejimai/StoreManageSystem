import imp
from django.shortcuts import render
from django.http.response import HttpResponse, JsonResponse
from usrManage.models import Usr
from usrManage.serializers import UsrSerializer
from rest_framework.decorators import api_view

@api_view(['GET'])
def usr_list(request):
  usr = Usr.objects.all()
  usr_serializer = UsrSerializer(usr, many=True)
  return JsonResponse(usr_serializer.data, safe=False)
