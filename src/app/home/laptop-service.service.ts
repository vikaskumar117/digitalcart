import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LaptopDetail } from 'src/Model/model';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {
  lstLaptop: Array<LaptopDetail> = [];
 
  constructor(private http: HttpClient) { }

  getLaptopList(): Observable<LaptopDetail[]> {
    return this.http.get<LaptopDetail[]>('assets/laptop/laptopItems.json');
  }
}
