import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { SignupComponent } from "./components/signup/signup.component";


const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'signIn', component: LoginComponent },
            { path: 'signUp', component: SignupComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}