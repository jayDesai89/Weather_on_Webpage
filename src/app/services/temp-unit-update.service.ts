import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempUnitUpdateService {
  private setTempUnitValue = new BehaviorSubject<string>('fahrenheit');
  getTempUnitValue = this.setTempUnitValue.asObservable();
  constructor() { }

  updateTempVal(unit:string) {
    console.log(`service ${unit}`);
    this.setTempUnitValue.next(unit);
  }
}
