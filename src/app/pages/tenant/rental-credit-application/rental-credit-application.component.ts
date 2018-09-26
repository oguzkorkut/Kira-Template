import {Component, OnInit, ViewEncapsulation} from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-rental-credit-application',
  templateUrl: './rental-credit-application.component.html',
  styleUrls: [
    './rental-credit-application.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class RentalCreditApplicationComponent implements OnInit {
  step2: any = {
    showNext: true,
    showPrev: true
  };

  step3: any = {
    showSecret: false
  };

  isCompleted = false;
  constructor() {
  }

  ngOnInit() {

  }

  onStep1Next(event) {
    console.log('Step1 - Next');
  }

  onStep2Next(event) {
    console.log('Step2 - Next');
  }

  onStep3Next(event) {
    console.log('Step3 - Next');
  }

  onComplete(event) {
    this.isCompleted = true;
  }

  onStepChanged(step) {
    console.log('Changed to ' + step.title);
  }
}