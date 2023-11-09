import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
    declarations: [
    LoginComponent,
    AuthComponent,
    SignupComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        HttpClientModule,
        SharedModule,
    ]
})
export class AuthModule {}