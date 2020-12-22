import { Component, Input, OnInit, Output } from '@angular/core';
import { TempUnitUpdateService } from '../services/temp-unit-update.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private tempUnitUpdateService: TempUnitUpdateService) { }

  ngOnInit() {
    this.switchUnit('fahrenheit');
  }

  switchUnit(unit) {
    this.tempUnitUpdateService.updateTempVal(unit);
  }
}
