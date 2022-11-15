import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './account-info/account-info.component';
import { FundAccountComponent } from './fund-account/fund-account.component';
import { FundInstructionComponent } from './fund-instruction/fund-instruction.component';
import { InfoStepOneComponent } from './info-step-one/info-step-one.component';
import { InfoStepThreeComponent } from './info-step-three/info-step-three.component';
import { InfoStepTwoComponent } from './info-step-two/info-step-two.component';
import { InfoComponent } from './info/info.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PDashboardComponent } from './pdashboard/pdashboard.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'signup',
    children: [
      { path: '', component: SignUpComponent },
      { path: 'info', component: InfoComponent, title: 'Info' },
      {
        path: 'verification',
        component: InfoStepOneComponent,
        title: 'Verification',
      },
      {
        path: 'personalinformation',
        component: InfoStepTwoComponent,
        title: 'Personal Information',
      },
      {
        path: 'image_upload',
        component: InfoStepThreeComponent,
        title: 'Upload Image',
      },
      { path: 'account-info', component: AccountInfoComponent },
    ],
  },
  {
    path: 'termsandcondi',
    component: TermsAndConditionComponent,
    title: 'Terms and Conditions',
  },
  { path: 'welcome', component: WelcomeComponent, title: 'Welcome ' },
  {
    path: 'setpassword',
    component: SetpasswordComponent,
    title: 'setpassword ',
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'dashboard', children: [
     { path: '', component: PDashboardComponent},
     {path:"fundaccount", component: FundInstructionComponent, title:"options" },
     {path:"fund_account", component: FundAccountComponent, title:"Fund Account" }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
