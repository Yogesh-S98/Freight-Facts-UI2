import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimeUiModule } from '../primeUi/prime-ui.module';

import { InputTextComponent } from './inputs/input-text/input-text.component';


@NgModule({
  declarations: [
    InputTextComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeUiModule],
  exports: [
    InputTextComponent,
  ]
})
export class ComponentsModule {}