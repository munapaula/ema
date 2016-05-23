from __future__ import absolute_import

from django.conf.urls import url

from . import views
from .views import AddTopicView, TaskUpdate

urlpatterns = [
    # /matrix/
    url(r'^$', views.matrix, name='matrix'),
    # /matrix/addtopic
    url(r'^addtopic/$', AddTopicView.as_view(), name='addtopic'),
    # /matrix/addedtopic
    url(r'^addedtopic/$', views.addedtopic, name='addedtopic'),
    # /matrix/5/
    url(r'^(?P<topic_id>[0-9]+)/$', views.topics, name='topics'),
    # /matrix/5/tasks
    url(r'^(?P<task_id>[0-9]+)/tasks/$', views.tasks, name='tasks'),
    # /matrix/5/adding
    url(r'^(?P<topic_id>[0-9]+)/adding/$', views.adding, name='adding'),
    # /matrix/added
    url(r'^added/$', views.added, name='added'),
    # /matrix/5/tasks/editing
    url(r'^(?P<task_id>[0-9]+)/taskediting/$', views.editing, name='taskediting')
]