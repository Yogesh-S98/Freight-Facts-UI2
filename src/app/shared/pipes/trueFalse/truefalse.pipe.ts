import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truefalse',
})
export class TruefalsePipe implements PipeTransform {
  transform(name: boolean) {
    let type;
    if (name == true) {
      type = 'Yes';
    } else if (name == false) {
      type = 'No';
    }

    return type;
  }
}