import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./screens/dashboard/dashboard.component";
import { UserscreenComponent } from "./screens/userscreen/userscreen.component";
import { OrganizationsComponent } from "./screens/organizations/organizations.component";


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                component: UserscreenComponent,
            },
            {
                path: 'organizations',
                component: OrganizationsComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganizationRoutingModule {}