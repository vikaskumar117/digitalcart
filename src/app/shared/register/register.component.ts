import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() closeRegister = new EventEmitter<boolean>();

  input: any;
  show: boolean = true;

  public constructor(private router: Router) {
      this.input = {
          "name": "",
          "email": "",
          "password": ""
      };
    }

  ngOnInit(): void {
  }

  register(){
   console.log('registered');
  }

  login(){
    this.closeRegister.emit(false);
    this.show = false;
    this.router.navigate(['/login']);
  }
}
