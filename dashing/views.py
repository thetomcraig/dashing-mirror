# -*- encoding: utf-8 -*-
from django.views.generic import TemplateView
from django.core.exceptions import PermissionDenied

from dashing.settings import dashing_settings

from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from random import randint
from django.views.generic import TemplateView

from datetime import datetime
from stock import StockCalc


class Dashboard(TemplateView):
    template_name = 'dashing/dashboard.html'
    permission_classes = dashing_settings.PERMISSION_CLASSES

    def check_permissions(self, request):
        """
        Check if the request should be permitted.
        Raises an appropriate exception if the request is not permitted.
        """
        permissions = [permission() for permission in self.permission_classes]
        for permission in permissions:
            if not permission.has_permission(request):
                raise PermissionDenied()

    def get(self, request, *args, **kwargs):
        self.check_permissions(request)
        return super(Dashboard, self).get(request, *args, **kwargs)


def home(request):
	template = loader.get_template('dashing/home.html')

	s = StockCalc()	
	data = s.get_weekly_data()
	data.sort(key=lambda r: r[0])			

	values = []
	for date,data in data:
		nice_number = round(float(data), 1)
		values.append(data)

	context = {
	}
	return HttpResponse(template.render(context, request))
