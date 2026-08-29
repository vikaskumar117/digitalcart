import { Component, OnInit } from '@angular/core';
import { CartService, OrderInfo } from '../shared/cart.service';

@Component({
    selector: 'app-track-order',
    templateUrl: './track-order.component.html',
    styleUrls: ['./track-order.component.css'],
    standalone: false
})
export class TrackOrderComponent implements OnInit {
  order: OrderInfo | null = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.order$.subscribe(order => {
      this.order = order;
    });
  }
}
