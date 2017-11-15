from django.conf.urls import url, include
from rest_framework import routers
from foldingathome import views as foldingathome_views

router = routers.DefaultRouter()

# RETURNS PROJECT QUERY SET FROM VIEWS
router.register(r'^projectList', foldingathome_views.ProjectListViewSet)
router.register(r'^BCHE_project_summary', foldingathome_views.BcheProjectSummaryViewSet)
router.register(r'^BCHE_project_run_summary', foldingathome_views.BcheProjectRunSummaryViewSet, base_name='BCHE_project_run_summary')
router.register(r'^BCHE_project_run_clone_summary', foldingathome_views.BcheProjectRunCloneSummaryViewSet, base_name='BCHE_project_run_clone_summary')
router.register(r'^BCHE_project_run_clone_detail', foldingathome_views.BcheProjectRunCloneDetailViewSet, base_name='BCHE_project_run_clone_detail')

urlpatterns = [
    url(r'^$', foldingathome_views.fah_information),
    url(r'^fah-information.html', foldingathome_views.fah_information),
    url(r'^index.html$', foldingathome_views.redirect_to_fah_information),
    url(r'^fah-completed.html', foldingathome_views.fah_completed),
    url(r'^fah-studies.html', foldingathome_views.fah_studies),
    url(r'^fah-studies-table.html', foldingathome_views.fah_studies_table),
    url(r'^fah-study.html', foldingathome_views.fah_study),
    url(r'^fah-project.html', foldingathome_views.fah_project),
    url(r'^fah-run.html', foldingathome_views.fah_run),
    url(r'^fah-clone.html', foldingathome_views.fah_clone),
    url(r'^api/', include(router.urls))
]
