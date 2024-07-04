# models.py
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', null=True, blank=True)

    def __str__(self):
        return self.name

class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.quantity} x {self.product.name}'

    @property
    def total_price(self):
        return self.quantity * self.product.price

class Order(models.Model):
    items = models.ManyToManyField(CartItem)
    shipping_cost = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    promo_code = models.CharField(max_length=50, null=True, blank=True)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f'Order #{self.id}'

    def calculate_total_cost(self):
        item_total = sum(item.total_price for item in self.items.all())
        self.total_cost = item_total + self.shipping_cost
        return self.total_cost
