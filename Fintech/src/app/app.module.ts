import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { InfoComponent } from './info/info.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfoStepOneComponent } from './info-step-one/info-step-one.component';
import { InfoStepTwoComponent } from './info-step-two/info-step-two.component';
import { InfoStepThreeComponent } from './info-step-three/info-step-three.component';
import {HttpClientModule} from "@angular/common/http";
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { PDashboardComponent } from './pdashboard/pdashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { FundInstructionComponent } from './fund-instruction/fund-instruction.component';
import { FundAccountComponent } from './fund-account/fund-account.component'


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignUpComponent,
    AccountInfoComponent,
    InfoComponent,
    InfoStepOneComponent,
    InfoStepTwoComponent,
    InfoStepThreeComponent,
    TermsAndConditionComponent,
    WelcomeComponent,
    LoginComponent,
    SetpasswordComponent,
    PDashboardComponent,
    DashboardComponent,
    FundInstructionComponent,
    FundAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
