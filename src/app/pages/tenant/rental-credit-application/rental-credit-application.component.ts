import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {transition, trigger, style, animate} from '@angular/animations';
import swal from 'sweetalert2';
import { PhoneFilterPipe } from '../../../pipe/phone-filter.pipe';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-rental-credit-application',
  templateUrl: './rental-credit-application.component.html',
  styleUrls: [
    './rental-credit-application.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class RentalCreditApplicationComponent implements OnInit {

  public step1Form: FormGroup;

  nextValueSteps1 = "Başvur";
  previousValueStep = "Geri";
  doneValueStep = "Başvuruyu Tamamla";

  /**
   * Kullanici telefon numarasi
   */
  public phoneNumber: string = '';
  public identityNumber: string;
  public isRead: boolean = false;
  public contratCheckBox: boolean;
  submitted: boolean;

  public modelWithValue: string
  public mask: Array<string | RegExp>

  isCompleted = false;

  constructor(private  phoneFilter: PhoneFilterPipe ) {
    
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    const identityNumber = new FormControl('', Validators.required);
    const phoneNumber= new FormControl('', Validators.required);
    const contratCheckBox = new FormControl('', [Validators.required]);

    this.step1Form = new FormGroup({
      identityNumber: identityNumber,
      phoneNumber: phoneNumber,
      contratCheckBox: contratCheckBox
    });

    this.onChanges();
  }

  ngOnInit() {

  }

  onChanges(): void {
    var that  = this; 
    this.step1Form.valueChanges.subscribe(val => {
      console.log(this.phoneNumber +  val.identityNumber +val.phoneNumber + val.contratCheckBox);

      console.log("Phone:" + this.phoneFilter.transform(val.phoneNumber));
    });

    /*
    this.step1Form.get('phoneNumber').valueChanges.subscribe(val => {
      console.log(val.phoneNumber);
    });
    */
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event, read:boolean) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
    if(read && !this.isRead){
      this.isRead = read;
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.step1Form);
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

  step2: any = {
    showNext: true,
    showPrev: true
  };

  step3: any = {
    showSecret: false
  };
}