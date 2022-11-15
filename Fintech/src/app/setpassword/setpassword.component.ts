import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../Services/user-services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {
  public errorMsg=""
  public password=""
  public cpass=''
  public currentUser:any
  public response:any

  constructor(public userService:UserServicesService, public router:Router) { }

  ngOnInit(): void {
    this.currentUser= this.userService.getCurrentUser()
    console.log(this.currentUser)
  }
  finish(){
    if(this.password=="" && this.cpass==""){
      this.errorMsg="Fill the Input"
    }else if(this.password=="" && this.cpass==""){
      this.errorMsg="Fill the missing details"
    }else if(this.password.length<6){
      this.errorMsg="Your password must be greater than 6"

    }else if(this.password!= this.cpass){
      this.errorMsg="Password Not match"
    }else{
      this.userService.setPassword(this.password,this.currentUser).subscribe((res)=>{
        this.response=res

        if(this.response.status){

          this.errorMsg= this.response.message
          localStorage.removeItem("email")
         this.router.navigate(["/login"])

        }else{
          this.errorMsg= this.response.message
        }

      })




    }

  }

}
