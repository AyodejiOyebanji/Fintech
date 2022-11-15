import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';

@Component({
  selector: 'app-info-step-one',
  templateUrl: './info-step-one.component.html',
  styleUrls: ['./info-step-one.component.css']
})
export class InfoStepOneComponent implements OnInit {
  public vericode=0
  public errorMsg=""
  public currentUser:any
  public  response:any
  public message:any
  constructor(

    public userService: UserServicesService, public router:Router

  ) {}
  ngOnInit(): void {
    this.currentUser= this.userService.getCurrentUser()


  }
  next(){
    if(this.vericode==0){
      this.errorMsg="Kindly fill in the input field"
    }else{
      let details= {currentUser:this.currentUser, code:this.vericode}




      this.userService.verifyCode(details).subscribe(res=>{
        this.response=res
        if(this.response.status){
          this.errorMsg=this.response.message
          this.router.navigate(['signup/personalinformation'])

        }else{
          this.errorMsg=this.response.message

        }



      })



    }
  }

}
