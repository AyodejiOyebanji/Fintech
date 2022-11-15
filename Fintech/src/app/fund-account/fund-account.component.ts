import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../Services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fund-account',
  templateUrl: './fund-account.component.html',
  styleUrls: ['./fund-account.component.css']
})
export class FundAccountComponent implements OnInit {
  public fundAccountAmount:any= 0;
  public isDisabled=true;
  public errorMsg="";
  public currentUser:any;
  public token:any;
  public response:any;
  public fundDetails:any;
  public currentUserEmail:any;
  public fundRes:any;
  public fundAmount:any;
  public accountBalance:any;
  constructor(public userService:UserServicesService,public router:Router) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage['token']);

     this.currentUser=this.userService.dashboard(this.token).subscribe((res)=>{
        this.response=res;
        console.log(this.response.result);
      this.fundAmount=this.response.result.fundAmount
      this.accountBalance=this.response.result.accountBalance
      console.log(this.fundAmount);


     })




  }
  fundMe(){
    let totalFunded = parseFloat( this.fundAmount) + parseInt(this.fundAccountAmount)
    let totalBal =parseFloat(this.accountBalance) + parseInt(this.fundAccountAmount)
    if(this.fundAccountAmount==0){
      this.errorMsg="Please enter an amount"



} else if(this.fundAccountAmount>=20000){
  this.errorMsg="Your amount is greater than #20,000:00"
}
else if(this.fundAccountAmount<=20000){

  this.fundDetails={
    amount:this.fundAccountAmount,
    trasactiontype:"Credit",
    ref_no: Math.floor(Math.random() * 9000000000000000),
    date: new Date(),
    description:"Self Credit",
    fundAmount: totalFunded,
    accountBalance:totalBal


  }


  this.currentUserEmail=this.response.result.email

  this.userService.fundAccount(this.fundDetails,this.currentUserEmail).subscribe(res=>{
      this.fundRes=res;
      if(this.fundRes.status){
        this.errorMsg=this.fundRes.message
        this.router.navigate(["/dashboard"])


      }


  })










    }
  }
}
