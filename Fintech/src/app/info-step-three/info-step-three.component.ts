import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';

@Component({
  selector: 'app-info-step-three',
  templateUrl: './info-step-three.component.html',
  styleUrls: ['./info-step-three.component.css'],
})
export class InfoStepThreeComponent implements OnInit {
  public myFile: any;

  public filename: any;
  public convertedImage:any="";
  public dispImage: any;
  public currentUser:any
  public errorMsg=""
  public response:any

  constructor(private userService:UserServicesService, public router:Router) {}

  ngOnInit(): void {
    if (!this.convertedImage) {
      this.dispImage = '../../assets/avater2-removebg-preview.png';
    }
    this.currentUser=this.userService.getCurrentUser()
  }
  getImage(event: any) {
    this.myFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.myFile);
    reader.onload = () => {
      this.convertedImage = reader.result;
      this.dispImage = this.convertedImage;
    };
  }

  next(){

    if(this.convertedImage==""){
      this.errorMsg="Kindly upload an Image"
    }else{


      this.userService.uploadImage(this.convertedImage,this.currentUser).subscribe((res)=>{
        this.response=res
        if(this.response.status){
          this.errorMsg=this.response.message
          this.router.navigate(["/termsandcondi"])

        }else{
          this.errorMsg=this.response.message
        }

      })


    }




  }
}
