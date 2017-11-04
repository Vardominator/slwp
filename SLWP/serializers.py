from rest_framework import serializers
from foldingathome.models import ProjectList, Bche, BcheProjectSummary


class ProjectListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectList
        fields = (
            'projNum',
            'projType',
            'dbServer',
            'server',
            'numRun',
            'numClone',
            'numAtoms',
            'description'
        )


class BcheSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bche
        fields = (
            'proj',
            'run',
            'clone',
            'frame',
            'rmsd_pro',
            'rmsd_complex',
            'mindist',
            'rg_pro',
            'E_vdw',
            'E_qq',
            'dssp',
            'Nhelix',
            'Nbeta',
            'Ncoil',
            'dateacquried',
            'timeacquired'
        )


class BcheProjectSummarySerializer(serializers.ModelSerializer):

    class Meta:
        model = BcheProjectSummary
        fields = (
            'proj',
            'proj_desc',
            'numRuns',
            'numClones',
            'avgRMSDPro',
            'stddevRMSDPro',
            'avgRMSDComplex',
            'stddevRMSDComplex',
            'rgPro',
            'stddevRGPro'
        )
