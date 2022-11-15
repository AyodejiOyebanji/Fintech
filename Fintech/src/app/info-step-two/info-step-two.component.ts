import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';

@Component({
  selector: 'app-info-step-two',
  templateUrl: './info-step-two.component.html',
  styleUrls: ['./info-step-two.component.css']
})
export class InfoStepTwoComponent implements OnInit {
  public currentUser:any
  public errorMsg="";
  public response:any
  constructor(private _formBuilder:FormBuilder, public userService:UserServicesService, public router:Router) { }
  public secondUserForm= this._formBuilder.group({
    home_address:["", [Validators.required]],
    city:["",[Validators.required]],
    state:["",[Validators.required]],
    school:["",[Validators.required]],
    bvn:["",[Validators.required, Validators.minLength(11)]],
    matricNo: ["", [Validators.required, Validators.minLength(5)]],
    nin: ["", [Validators.required, Validators.minLength(11)]]


  })

  ngOnInit(): void {
    this.currentUser=this.userService.getCurrentUser()
  }

  next(){
    if(this.secondUserForm.value.home_address==""&&this.secondUserForm.value.city==""&&this.secondUserForm.value.state==""&&this.secondUserForm.value.school==""&&this.secondUserForm.value.matricNo==""&& this.secondUserForm.value.nin==""&&this.secondUserForm.value.school==""){
      this.errorMsg="Kindly fill up your details"
    } else if(this.secondUserForm.value.home_address==""||this.secondUserForm.value.city==""||this.secondUserForm.value.state==""||this.secondUserForm.value.school==""||this.secondUserForm.value.matricNo==""|| this.secondUserForm.value.nin==""||this.secondUserForm.value.school==""){
      this.errorMsg="Kindly fill up the missing details"
    }
    else {
      let data=this.secondUserForm.value;
      let currentUser= this.currentUser
      this.userService.personalDetails(data,currentUser).subscribe((res)=>{
        this.response=res
        if(this.response.status){
          this.errorMsg=this.response.message;
          this.router.navigate(["/signup/image_upload"])


        }else{
          this.errorMsg=this.response.message

        }



      })


    }



  }

}
