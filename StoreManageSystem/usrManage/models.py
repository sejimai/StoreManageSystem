from django.db import models

class Usr(models.Model):
    uid = models.CharField(primary_key=True, max_length=20)
    user_name = models.CharField(max_length=20, blank=True, null=True)
    password = models.CharField(max_length=40, blank=True, null=True)
    email = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usr'
