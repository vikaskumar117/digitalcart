import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { LaptopDetail } from 'src/Model/model';
import { LaptopService } from '../home/laptop-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartItem, CartService } from '../shared/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [LaptopDetail, NgxPaginationModule]
})
export class ProductComponent implements OnInit {
  res: any;
  lstLaptop: LaptopDetail[] = [];
  config: any;

  constructor(private modal: NgbModal, private laptopService: LaptopService, private cartService: CartService) {
    this.config = {
      id: 'basicPaginate',
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: 25
    };
  }

  ngOnInit(): void {
    this.laptopService.getLaptopList().subscribe((data: LaptopDetail[]) => {
      this.lstLaptop = data;
    });
  }

  pageChanged(event: any): void {
    this.config.currentPage = event;
  }

  search(event: any): void {
    const value = event.target.value.trim();

    this.laptopService.getLaptopList().subscribe((data: LaptopDetail[]) => {
      this.lstLaptop = data;

      if (!value) {
        return;
      }

      this.lstLaptop = this.lstLaptop.filter((item: LaptopDetail) =>
        item.Name.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  addToCartClick(value: any, src: any): void {
    const laptop = new LaptopDetail();
    const item: CartItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: laptop.Name || 'Laptop',
      price: Number(value),
      description: 'This is the description of selected item.',
      quantity: 1,
      src: src
    };

    const actualItem = this.lstLaptop.find((x: LaptopDetail) => x.Price === value || x.Src === src);
    if (actualItem) {
      item.name = actualItem.Name;
      item.description = actualItem.Description;
    }

    this.cartService.addToCart(item);

    this.res = this.openModel(
      'AppComponent',
      {
        ...item,
        Name: item.name,
        Price: String(item.price),
        Quantity: item.quantity,
        Src: item.src
      },
      'AddToCart',
      'Cart Items',
      'OK',
      'Cancel'
    );
  }

  openModel(from: any, data: any, type: any, title: any, button1text: any, button2txt?: any) {
    const modalRef = this.modal.open(DialogComponent, {
      backdrop: 'static',
    });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.type = 'Cart Details';
    modalRef.componentInstance.title = 'cart items';
    modalRef.componentInstance.buttonOK = 'OK';

    if (button2txt !== '') {
      modalRef.componentInstance.buttonCancel = button2txt;
    }

    modalRef.result.then((response: any) => {
      if (response === 'ok') {
        console.log(`Dialog result: ${response}`);
      }
    });
  }
}
