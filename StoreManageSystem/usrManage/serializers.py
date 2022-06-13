from http.client import ImproperConnectionState
from rest_framework import serializers
from usrManage.models import Usr

class UsrSerializer(serializers.ModelSerializer):
  class Meta:
    model = Usr
    fields = (
      'uid',
      'user_name',
      'password',
      'email',
    )
