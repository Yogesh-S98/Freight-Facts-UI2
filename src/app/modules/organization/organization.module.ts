import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { OrganizationRoutingModule } from "./organization-routing.module";
import { OrganizationsComponent } from './screens/organizations/organizations.component';

// import { AuthRoutingModule } from "./auth-routing.module";
// import { LoginComponent } from './components/login/login.component';
// import { AuthComponent } from './components/auth/auth.component';
// import { SignupComponent } from './components/signup/signup.component';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        OrganizationRoutingModule,
        SharedModule,
    ],
    declarations: [
      DashboardComponent,
      OrganizationsComponent,
    ]
})
export class OrganizationModule {}