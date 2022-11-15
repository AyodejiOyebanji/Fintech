import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';

@Component({
  selector: 'app-pdashboard',
  templateUrl: './pdashboard.component.html',
  styleUrls: ['./pdashboard.component.css'],
})
export class PDashboardComponent implements OnInit {
  public usertoken: any;
  showFiller = false;
  public currentTime: any;
  public greetings: any;
  public response: any;
  public errorMsg: any;
  public userDetails: any;

  constructor(public router: Router, public userService: UserServicesService) {}

  ngOnInit(): void {
    this.usertoken = JSON.parse(localStorage['token']);
    this.userService.dashboard(this.usertoken).subscribe((res) => {
      this.response = res;
      console.log(this.response)
      if (this.response.status) {
        this.userDetails = this.response.result;
      }
    });

    this.currentTime = new Date().getHours();

    if (this.currentTime < 12) {
      this.greetings = 'Good Morning';
    } else if (this.currentTime >= 12 && this.currentTime <= 17) {
      this.greetings = 'Good Afternoon';
    } else if (this.currentTime >= 17 && this.currentTime <= 24) {
      this.greetings = 'Good Evening';
    }
  }

}
