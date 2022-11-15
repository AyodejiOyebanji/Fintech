import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( public router:Router) { }

  ngOnInit(): void {
  }
  accountInfo(){
    this.router.navigate(["/signup/account-info"])
  }
  info(){
    this.router.navigate(["/signup/info"])
  }
}
