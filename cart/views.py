from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product, CartItem, Order

def index(request):
    return render(request, 'cart/index.html')




def cart_view(request):
    products = Product.objects.all()
    cart_items = CartItem.objects.all()
    context = {
        'products': products,
        'cart_items': cart_items,
    }
    return render(request, 'cart.html', context)

@csrf_exempt
def add_item(request):
    # Logic to add item to the cart
    return JsonResponse({'success': True})

@csrf_exempt
def update_item(request):
    # Logic to update item quantity in the cart
    return JsonResponse({'success': True})

@csrf_exempt
def remove_item(request):
    # Logic to remove item from the cart
    return JsonResponse({'success': True})

def checkout(request):
    return render(request, 'cart/checkout.html')
