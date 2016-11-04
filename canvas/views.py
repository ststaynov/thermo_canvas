from django.shortcuts import render_to_response


def index(request):
    return render_to_response('canvas/index.html', {})


def snow(request):
    return render_to_response('canvas/snow.html', {})


def rain(request):
    return render_to_response('canvas/rain.html', {})