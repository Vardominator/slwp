from django.shortcuts import render, redirect
from foldingathome.models import ProjectList, Bche, BcheProjectSummary
from SLWP.serializers import *
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


def fah_information(request):
    return render(request, 'fah-information.html')


def redirect_to_fah_information():
    return redirect('/foldingathome/fah-information.html')


def fah_studies(request):
    return render(request, 'fah-studies.html')


def fah_studies_table(request):
    return render(request, 'fah-studies-table.html')


def fah_study(request):
    return render(request, 'fah-study.html')


def fah_project(request):
    return render(request, 'fah-project.html')


def fah_run(request):
    return render(request, 'fah-run.html')


def fah_completed(request):
    return render(request, 'fah-completed.html')


class ProjectListViewSet(viewsets.ModelViewSet):
    queryset = ProjectList.objects.all()
    serializer_class = ProjectListSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = (
        'projNum',
        'projType',
        'dbServer',
        'server',
        'numRun',
        'numClone',
        'numAtoms',
        'description'
    )

class BcheProjectSummaryViewSet(viewsets.ModelViewSet):
    queryset = BcheProjectSummary.objects.all()
    serializer_class = BcheProjectSummarySerializer
    filter_backends = (DjangoFilterBackend,)


class BcheProjectRunSummaryViewSet(viewsets.ModelViewSet):
    serializer_class = BcheProjectRunSummarySerializer

    def get_queryset(self):
        project = self.request.query_params.get('project', None)
        queryset = None
        if project is not None:
            queryset = Bche.objects.raw(
                'select proj, run as Run, AVG(rmsd_pro) as AverageRMSDPro, STDDEV(rmsd_pro) as StdDevRMSDPro, AVG(rmsd_complex) as AverageRMSDComplex, STDDEV(rmsd_complex) as StdDevRMSDComplex, AVG(rg_pro) as RGPro, STDDEV(rg_pro) as StdDevRGPro from BCHE where proj = %s group by run', [project])
        return queryset


class BcheProjectRunCloneSummaryViewSet(viewsets.ModelViewSet):
    serializer_class = BcheProjectRunCloneSummarySerializer

    def get_queryset(self):
        project = self.request.query_params.get('project', None)
        run = self.request.query_params.get('run', None)
        queryset = None
        if project is not None and run is not None:
            queryset = Bche.objects.raw(
                'select proj, clone as Clone, AVG(rmsd_pro) as AverageRMSDPro, STDDEV(rmsd_pro) as StdDevRMSDPro, AVG(rmsd_complex) as AverageRMSDComplex, STDDEV(rmsd_complex) as StdDevRMSDComplex, AVG(rg_pro) as RGPro, STDDEV(rg_pro) as StdDevRGPro from BCHE where proj = %s and run = %s group by clone', [project, run])
        return queryset

class BcheProjectRunCloneDetailViewSet(viewsets.ModelViewSet):
    serializer_class = BcheSerializer

    def get_queryset(self):
        project = self.request.query_params.get('project', None)
        run = self.request.query_params.get('run', None)
        clone = self.request.query_params.get('clone', None)
        queryset = None
        if project is not None and run is not None and clone is not None:
            queryset = Bche.objects.filter(proj=project, run=run, clone=clone)
        return queryset
