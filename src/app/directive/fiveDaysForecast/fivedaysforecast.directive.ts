import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFivedaysforecast]'
})
export class FivedaysforecastDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
    console.log(el);
  }

}
