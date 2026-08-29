import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LaptopService } from './laptop-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [HomeComponent, SearchPipe],
  imports: [
    NgxPaginationModule,
    CommonModule
  ],
  exports: [HomeComponent],
  providers: [LaptopService]
})
export class HomeModule { }
