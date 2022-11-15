import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private currentUser:any;
  public accountNumber:any;
  public firstName:any;
  public lastName:any;
  public response:any


  constructor(private router:Router, private userService:UserServicesService) { }

  ngOnInit(): void {
    this.currentUser=this.userService.getCurrentUser()
    this.userService.getUserDetails(this.currentUser).subscribe((res)=>{
      console.log(res);
      this.response=res
      if(this.response.status){
        this.accountNumber=this.response.user.accountNo
        this.firstName=this.response.user.first_name;
        this.lastName=this.response.user.last_name;
        
         this.router.navigate(['/setpassword']);

      }
    })

  }



}
