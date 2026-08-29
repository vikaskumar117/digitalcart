import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaptopService } from '../home/laptop-service.service';
import { LaptopDetail } from 'src/Model/model';
import { CartItem, CartService } from '../shared/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: false
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  availableProducts: LaptopDetail[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private laptopService: LaptopService
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });

    this.laptopService.getLaptopList().subscribe((products: LaptopDetail[]) => {
      this.availableProducts = products;
    });
  }

  increase(item: CartItem): void {
    this.cartService.updateQuantity(item.id, 1);
  }

  decrease(item: CartItem): void {
    this.cartService.updateQuantity(item.id, -1);
  }

  remove(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
  }

  addMoreProducts(): void {
    this.router.navigate(['/products']);
  }

  placeOrder(): void {
    const order = this.cartService.createOrder();
    if (order) {
      this.router.navigate(['/home']);
    }
  }
}
