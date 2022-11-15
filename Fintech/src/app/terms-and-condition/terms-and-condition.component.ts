import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.css']
})
export class TermsAndConditionComponent implements OnInit {
  public accountNumber:any;
  public currentUser:any;
  public errorMsg=""
  public response:any
  constructor(public userService:UserServicesService, public router:Router) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser()
  }

  agree(){
    this.accountNumber="213"+  Math.floor(1000000 + Math.random() * 900000)
    let userDetails={
      accountNo:this.accountNumber,
      accountBalance:0,
      fundAmount:0,

    }
   this.userService.generateAccountNumber(userDetails,this.currentUser).subscribe((res)=>{
   this.response=res
    if(this.response.status){
      this.errorMsg= this.response.message;
      this.router.navigate(['/welcome'])


    }else{
      this.errorMsg= this.response.message;
    }
   })

  }

}
