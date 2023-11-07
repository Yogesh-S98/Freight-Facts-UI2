import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  @Input() ngModel: string;
  @Input() toggleMask: boolean;
  @Input() formGroup: FormGroup;
  @Input() class = 'inputbox';
  @Input() name = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() maxlength: number = null;
  @Input() minlength: number = null;
  @Input() showErrorMessage = true;
  @Input() error = '';
  @Input() placeholder = null;
  @Input() icon = '';
  @Input() label = '';
  @Input() className = '';
  @Input() inlineStyle = '';
  @Input() spaces: number;
  @Input() numbersOnly = false;
  @Input() requiredStar = false;
  @Output() eventHappend = new EventEmitter<any>();
  style: string;

  eventFromInputText(event) {
    this.eventHappend.emit(event);
  }
}
