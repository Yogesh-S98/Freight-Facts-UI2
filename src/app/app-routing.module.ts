import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/components/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signIn',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => 
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/organization/organization.module').then(
            (m) => m.OrganizationModule
          ),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
