from django.shortcuts import render, redirect

def index(request):
    return render(request, 'index.html')

def home(request):
    return render(request, 'home.html')

def home_redirect(request):
    return redirect('/home.html')