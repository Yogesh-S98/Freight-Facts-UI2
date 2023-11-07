import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimeUiModule } from '../primeUi/prime-ui.module';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { PasswordComponent } from './inputs/password/password.component';
import { ButtonComponent } from './inputs/button/button.component';

// import { InputTextComponent } from './inputs/input-text/input-text.component';


@NgModule({
  declarations: [
    InputTextComponent,
    PasswordComponent,
    ButtonComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeUiModule],
  exports: [
    InputTextComponent,
    PasswordComponent,
    ButtonComponent,
  ]
})
export class ComponentsModule {}