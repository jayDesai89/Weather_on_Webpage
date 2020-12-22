import { Directive, Input, OnInit } from '@angular/core';
import { TempUnitUpdateService } from 'src/app/services/temp-unit-update.service';

@Directive({
  selector: '[appTempUnitUpdate]'
})
export class TempUnitUpdateDirective implements OnInit {
  temperatureUnit: any;
  @Input()
  appTempUnitUpdate: any;

  constructor(private tempUnitUpdateService: TempUnitUpdateService) { }

  ngOnInit() {
    this.temperatureUnit = this.tempUnitUpdateService.getTempUnitValue;
    console.log(`directive ${this.temperatureUnit}`);
    console.log(`2 directive ${this.appTempUnitUpdate}`);
    this.updateUnit(this.temperatureUnit);
  }

  updateUnit(val) {
    console.log(`directive ${val}`);
  }
}
