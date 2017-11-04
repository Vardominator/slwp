from __future__ import unicode_literals
from django.db import models


class ProjectList(models.Model):
    projNum = models.IntegerField(primary_key=True)
    projType = models.CharField(max_length=10)
    dbServer = models.CharField(max_length=100)
    server = models.CharField(max_length=50)
    numRun = models.IntegerField()
    numClone = models.IntegerField()
    numAtoms = models.IntegerField()
    description = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'ProjectList'
        app_label = 'projectlist'


class Bche(models.Model):
    proj = models.IntegerField(primary_key=True)
    run = models.IntegerField()
    clone = models.IntegerField()
    frame = models.IntegerField()
    rmsd_pro = models.FloatField()
    rmsd_complex = models.FloatField()
    mindist = models.FloatField()
    rg_pro = models.FloatField()
    E_vdw = models.FloatField()
    E_qq = models.FloatField()
    dssp = models.CharField(max_length=550)
    Nhelix = models.IntegerField()
    Nbeta = models.IntegerField()
    Ncoil = models.IntegerField()
    dateacquried = models.DateField()
    timeacquired = models.TimeField()

    class Meta:
        managed = False
        db_table = 'BCHE'
        app_label = 'bche'

class BcheProjectSummary(models.Model):
    proj = models.IntegerField(db_column='Project Number', primary_key=True)
    proj_desc = models.CharField(max_length=100, db_column='Project Description')
    numRuns = models.IntegerField(db_column='# of Runs')
    numClones = models.IntegerField(db_column='# of Clones')
    avgRMSDPro = models.FloatField(db_column='Average RMSD of Protein')
    stddevRMSDPro = models.FloatField(db_column='Standard Deviation for RMSD of Protein')
    avgRMSDComplex = models.FloatField(db_column='Average RMSD of Complex')
    stddevRMSDComplex = models.FloatField(db_column='Standard Deviation for RMSD of Complex')
    rgPro = models.FloatField(db_column='RG of Protein')
    stddevRGPro = models.FloatField(db_column='Standard Deviation for RG of Protein')

    class Meta:
        managed = False
        db_table = 'bche_project_summary'
        app_label = 'bche'
