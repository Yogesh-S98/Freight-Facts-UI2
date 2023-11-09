import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimeUiModule } from '../primeUi/prime-ui.module';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { PasswordComponent } from './inputs/password/password.component';
import { ButtonComponent } from './inputs/button/button.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TableComponent } from './table/table.component';

// import { InputTextComponent } from './inputs/input-text/input-text.component';


@NgModule({
  declarations: [
    InputTextComponent,
    PasswordComponent,
    ButtonComponent,
    SideNavComponent,
    NavBarComponent,
    TableComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeUiModule],
  exports: [
    InputTextComponent,
    PasswordComponent,
    ButtonComponent,
    SideNavComponent,
    NavBarComponent,
    TableComponent,
  ]
})
export class ComponentsModule {}