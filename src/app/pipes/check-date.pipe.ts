import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkDate'
})
export class CheckDatePipe implements PipeTransform {
  previouseValue;
  transform(value: any, ...args: any[]): any {
    return null;
  }

}
