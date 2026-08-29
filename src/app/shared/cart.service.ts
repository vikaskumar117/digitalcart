import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  src: string;
}

export interface OrderInfo {
  orderId: string;
  transactionId: string;
  status: string;
  expectedDelivery: string;
  items: CartItem[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private orderSubject = new BehaviorSubject<OrderInfo | null>(null);

  cart$ = this.cartSubject.asObservable();
  order$ = this.orderSubject.asObservable();

  addToCart(item: CartItem): void {
    const current = this.cartSubject.value;
    const existingIndex = current.findIndex(x => x.id === item.id);

    if (existingIndex >= 0) {
      current[existingIndex].quantity += item.quantity;
      this.cartSubject.next([...current]);
      return;
    }

    this.cartSubject.next([...current, item]);
  }

  updateQuantity(itemId: string, change: number): void {
    const current = this.cartSubject.value.map(item => {
      if (item.id !== itemId) {
        return item;
      }

      const updatedQuantity = item.quantity + change;
      return { ...item, quantity: updatedQuantity > 0 ? updatedQuantity : 0 };
    }).filter(item => item.quantity > 0);

    this.cartSubject.next(current);
  }

  removeFromCart(itemId: string): void {
    this.cartSubject.next(this.cartSubject.value.filter(item => item.id !== itemId));
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }

  getCartItems(): CartItem[] {
    return this.cartSubject.value;
  }

  getCartCount(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  createOrder(): OrderInfo | null {
    const items = this.cartSubject.value;

    if (!items.length) {
      return null;
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + 5);

    const order: OrderInfo = {
      orderId: 'ORD-' + Date.now(),
      transactionId: 'TXN-' + Math.floor(Math.random() * 900000 + 100000),
      status: 'Order is awaiting for approval.',
      expectedDelivery: expectedDate.toLocaleString(),
      items: [...items],
      total
    };

    this.orderSubject.next(order);
    this.clearCart();
    return order;
  }

  getOrder(): OrderInfo | null {
    return this.orderSubject.value;
  }

  updateOrderStatus(status: string): void {
    const currentOrder = this.orderSubject.value;
    if (!currentOrder) {
      return;
    }

    this.orderSubject.next({ ...currentOrder, status });
  }
}
