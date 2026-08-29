import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MakhanaDetail } from 'src/Model/model';
import { MakhanaService } from '../../home/makhana-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MakhanaDetail]
})

export class HomeComponent implements OnInit {
res: any;
lstMakhana: any = [];
config: any;

constructor(private modal: NgbModal, private makhanaService: MakhanaService){
  this.lstMakhana = [];
  this.config = {
    id: 'basicPaginate',
    itemsPerPage: 3,
    currentPage: 1,
    totalItems: 25
  };
}

  ngOnInit(): void {
    this.makhanaService.getMakhanaList()
    .subscribe((data: MakhanaDetail[]) => {
      this.lstMakhana = data;
    });
  }

  // tslint:disable-next-line:typedef
  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  // tslint:disable-next-line:typedef
  search(event: any){
    this.lstMakhana = this.makhanaService.getMakhanaList();
    const search = event.target.value;// $('#SearchProduct').value;
    //  this.lstMakhana = SearchPipe.transform(this.lstMakhana,search);
     // tslint:disable-next-line:variable-name
     //const prices = this.lstMakhana.map(x: any => x.Price);
     // tslint:disable-next-line:variable-name
    if(search !== ''){
      this.lstMakhana = this.lstMakhana.filter((x: MakhanaDetail) => x.Price === search);
     }
  }

  // tslint:disable-next-line:typedef
  addToCartClick(value: any, src: any){
    const makhna = new MakhanaDetail();
    makhna.Name = '₹ '+ value;
    makhna.Price = value;
    makhna.Description = 'This is the description of selected item.';
    makhna.Quantity = 1;
    makhna.Src = src;

    this.res = this.openModel(
      'AppComponent',
      makhna,
      'AddToCart',
      'Cart Items',
      'OK',
      'Cancle'
    );
  }

  // tslint:disable-next-line:typedef
  openModel(from: any, data: any, type: any, title: any, button1text: any, button2txt?: any) {
    const modalRef = this.modal.open(DialogComponent, {
      backdrop: 'static',
    });
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.type = 'Cart Details';
    modalRef.componentInstance.title = 'cart items';
    modalRef.componentInstance.buttonOK = 'OK';
    if (button2txt !== '') {
      modalRef.componentInstance.buttonCancle = button2txt;
    }

    modalRef.result.then((response: any) => {
      if (response === 'ok') {
        console.log(`Dialog result: ${response}`);
      }
    });
  }

}
