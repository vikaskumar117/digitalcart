import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from 'src/app/sidebar/sidebar/sidebar.component';
import { CartService } from 'src/app/shared/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  cartCount = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  openSideBarClick() {
    console.log('clicked');
    this.sidebar.show();
  }
  closeSideBarClick() {
    this.sidebar.hide();
  }

  contactUs() {
    this.router.navigate(['/contactus']);
  }
  cart(){
    this.router.navigate(['/cart']);
  }
  trackOrder(){
    this.router.navigate(['/track-order']);
  }
  products() {
    this.router.navigate(['/products']);
  }
  home() {
    this.router.navigate(['/']);
  }
  login(){
    this.router.navigate(['/login']);
  }
}
