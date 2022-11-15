import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../Services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMsg:any=""
  public email:any="";
  public password:any="";
  public response:any;

  constructor(public userService:UserServicesService, public router:Router) { }

  ngOnInit(): void {
  }
  next(){
    if(this.email==""&& this.password==""){
      this.errorMsg="Please enter your details"


    }else if(this.email==""|| this.password==""){
      this.errorMsg="Please enter the missing details"


    }else{
      let data={
        email:this.email,
       password: this.password

      }
      this.userService.login(data).subscribe((res)=>{
        this.response=res;
        console.log(this.response)
        if(this.response.status){
          this.errorMsg=this.response.message;
          localStorage.setItem("token",JSON.stringify( this.response.token))
          this.router.navigate([`/dashboard`])


        }else{
          this.errorMsg=this.response.message
        }


      })


    }

  }

}
