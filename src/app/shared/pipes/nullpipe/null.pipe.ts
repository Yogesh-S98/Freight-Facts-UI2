import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'null',
})
export class NullPipe implements PipeTransform {
  transform(name: string) {
    let type;
    if (name) {
      type = name;
    } else {
      type = '-';
    }

    return type;
  }
}