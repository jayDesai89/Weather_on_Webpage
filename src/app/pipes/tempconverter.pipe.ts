import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempconverter'
})
export class TempconverterPipe implements PipeTransform {
  /**
   * @param value = Temperature value in kelvin
   * @param tempUnit = based on button clicked in Header
   * Change the Unit type of temperature in header
   * Transform the value based on unit value fahrenheit or celsius
   */
  transform(value:any,tempUnit?: any): any {
    if (tempUnit === 'fahrenheit') {
      value = ((value-273.15)*(9/5))+32
    } else if (tempUnit === 'celsius'){
      value =  value-273.15;
    } else {
      return value;
    }
    return Math.floor(value);
  }

}
