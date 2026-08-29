import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MakhanaDetail } from 'src/Model/model';

@Injectable({
  providedIn: 'root'
})
export class MakhanaService {
  lstMakhana: Array<MakhanaDetail> = [];
 
  constructor(private http: HttpClient) { }

  getMakhanaList(): Observable<MakhanaDetail[]> {
    return this.http.get<MakhanaDetail[]>('assets/laptop/laptopItems.json');
  }
}
