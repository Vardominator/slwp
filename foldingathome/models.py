# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or
# field names.
from __future__ import unicode_literals

# from django.db import models


# class Project(models.Model):
#     number = models.IntegerField(primary_key=True)
#     complete = models.IntegerField()

#     class Meta:
#         managed = False
#         db_table = 'project'


# class Run(models.Model):
#     project_number = models.IntegerField(primary_key=True)
#     number = models.IntegerField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'run'


# class Clone(models.Model):
#     project_number = models.IntegerField(primary_key=True)
#     run_number = models.IntegerField(primary_key=True)
#     number = models.IntegerField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'clone'


# class Time(models.Model):
#     project_number = models.IntegerField(primary_key=True)
#     run_number = models.IntegerField(primary_key=True)
#     clone_number = models.IntegerField(primary_key=True)
#     number = models.IntegerField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'time'


# class Attribute(models.Model):
#     name = models.CharField(primary_key=True, max_length=100)

#     class Meta:
#         managed = False
#         db_table = 'attribute'


# class TimeAttribute(models.Model):
#     project_number = models.IntegerField(primary_key=True)
#     run_number = models.IntegerField(primary_key=True)
#     clone_number = models.IntegerField(primary_key=True)
#     time_number = models.IntegerField(primary_key=True)
#     attribute_name = models.CharField(primary_key=True, max_length=100)
#     value = models.DecimalField(max_digits=18, decimal_places=9)

#     class Meta:
#         managed = False
#         db_table = 'time_attribute'
