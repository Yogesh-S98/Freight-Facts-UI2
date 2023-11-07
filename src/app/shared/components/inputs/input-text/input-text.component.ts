import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputTextComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() class = 'inputbox';
  @Input() name = '';
  @Input() disabled=false;
  @Input() readonly=false;
  @Input() maxlength: number=null;
  @Input() minlength: number=null;
  @Input() showErrorMessage = true;
  @Input() error = '';
  @Input() placeholder = null;
  @Input() type = 'text';
  @Input() icon = '';
  @Input() pKeyFilter: string;
  @Input() label = '';
  @Input() className = '';
  @Input() min: number;
  @Input() max: number;
  @Input() inlineStyle = "";
  @Input() spaces:number;
  @Input() numbersOnly=false;
  @Input() requiredStar = false;
  @Output() eventHappend = new EventEmitter<any>();
  style: string;
  ngOnInit(): void {
    this.style = this.style + this.inlineStyle;
  }

  // stop white spaces
  isWhiteSpace(char): boolean {
    return /\s/.test(char);
  }
  eventFromInputText(event){
      this.eventHappend.emit(event);
  }
  willCreateWhitespaceSequence(evt): boolean {
    let willCreateWSS = false;
    if (this.isWhiteSpace(evt.key)) {
      const elmInput = evt.currentTarget;
      const content = elmInput.value;
      const posStart = elmInput.selectionStart;
      const posEnd = elmInput.selectionEnd;
      willCreateWSS =
        this.isWhiteSpace(content[posStart - 1] || '') ||
        this.isWhiteSpace(content[posEnd] || '');
    }
    return willCreateWSS;
  }

  isAlfa(evt: any): boolean {
    return this.willCreateWhitespaceSequence(evt) ? false : true;
  }
  onKeydown(event) {
    if (event.keyCode === 32) {
      return false;
    } else {
      return true;
    }
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
