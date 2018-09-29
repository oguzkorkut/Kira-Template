import { isNull } from 'util';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {transition, trigger, style, animate} from '@angular/animations';
import swal from 'sweetalert2';
import { PhoneFilterPipe } from '../../../pipe/phone-filter.pipe';
import {CustomValidators} from 'ng2-validation';
import { CONSTANTS } from '../../../service/constants';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

 

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

import '../../../../../node_modules/jquery/dist/jquery.js';
import '../../../../assets/js/j-pro/jquery.j-pro.js';
import '../../../../assets/js/j-pro/jquery-ui.min.js';
import '../../../../assets/js/jquery-ui/jquery-ui.min.js';
import '../../../../assets/js/jquery.maskedinput/jquery.maskedinput.min.js';
 
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-rental-credit-application',
  templateUrl: './rental-credit-application.component.html',
  styleUrls: [
    './rental-credit-application.component.css',
    '../../../../assets/css/j-pro/j-pro-modern.css'
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

  /**
   * Step1
   */
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

  step1Submitted: boolean = false;
  /**
   * Step1 end
   */

  public modelWithValue: string
  public mask: Array<string | RegExp>;

  isCompleted = false;

  constructor(private  phoneFilter: PhoneFilterPipe ) {

    this.mask = CONSTANTS.phoneMask;
    
    this.createStep1FormGroup();

    this.onChanges();

  }

  createStep1FormGroup(){
    const identityNumber = new FormControl('', [Validators.required, CustomValidators.gt(10000000000)]);
    const phoneNumber= new FormControl('', Validators.required);
    const contratCheckBox = new FormControl('', [Validators.required]);

    this.step1Form = new FormGroup({
      identityNumber: identityNumber,
      phoneNumber: phoneNumber,
      contratCheckBox: contratCheckBox
    });
  }

  ngOnInit() {
    
  }
  onChanges(): void {
    
    /**
     * Step1 onChanges
     */
    this.step1Form.valueChanges.subscribe(val => {
       if(this.step1Form.valid && this.phoneFilter.transform(val.phoneNumber) != ''){
          this.step1Submitted = true;
       } else{
        this.step1Submitted = false;
       }
    });

    /**
     * Step1 onChanges end
     */

    /*
    this.step1Form.get('phoneNumber').valueChanges.subscribe(val => {
      console.log(val.phoneNumber);
    });
    */
  }

  /**
     * Step1 onChanges
     */
  openContractText(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeContractText(event, read:boolean) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
    if(read && !this.isRead){
      this.isRead = read;
    }
  }

   /**
     * Step1 onChanges end
     */

  onSubmit() {
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


  jproStep2Form(){
 
      // Phone masking
      $("#phone").mask("(999) 999-9999", { placeholder: "x" });
  
      /***************************************/
      /* Datepicker */
      /***************************************/
      // Start date
      function dateFrom(date_from, date_to) {
          $(date_from).datepicker({
              dateFormat: "mm/dd/yy",
              prevText: '<i class="fa fa-caret-left"></i>',
              nextText: '<i class="fa fa-caret-right"></i>',
              onClose: function(selectedDate) {
                  $(date_to).datepicker("option", "minDate", selectedDate);
              }
          });
      }
  
      // Finish date
      function dateTo(date_from, date_to) {
          $(date_to).datepicker({
              dateFormat: "mm/dd/yy",
              prevText: '<i class="fa fa-caret-left"></i>',
              nextText: '<i class="fa fa-caret-right"></i>',
              onClose: function(selectedDate) {
                  $(date_from).datepicker("option", "maxDate", selectedDate);
              }
          });
      }
  
      // Destroy date
      function destroyDate(date) {
          $(date).datepicker("destroy");
      }
  
      // Initialize date range
      dateFrom("#date_from", "#date_to");
      dateTo("#date_from", "#date_to");
      /***************************************/
      /* end datepicker */
      /***************************************/
  
      // Validation
      $("#j-pro").justFormsPro({
          rules: {
              name: {
                  required: true
              },
              email: {
                  required: true,
                  email: true
              },
              phone: {
                  required: true
              },
              adults: {
                  required: true,
                  integer: true,
                  minvalue: 0
              },
              children: {
                  required: true,
                  integer: true,
                  minvalue: 0
              },
              date_from: {
                  required: true
              },
              date_to: {
                  required: true
              },
              message: {
                  required: true
              }
          },
          messages: {
              name: {
                  required: "Add your name"
              },
              email: {
                  required: "Add your email",
                  email: "Incorrect email format"
              },
              phone: {
                  required: "Add your phone"
              },
              adults: {
                  required: "Field is required",
                  integer: "Only integer allowed",
                  minvalue: "Value not less than 0"
              },
              children: {
                  required: "Field is required",
                  integer: "Only integer allowed",
                  minvalue: "Value not less than 0"
              },
              date_from: {
                  required: "Select check-in date"
              },
              date_to: {
                  required: "Select check-out date"
              },
              message: {
                  required: "Enter your message"
              }
          },
          afterSubmitHandler: function() {
              // Destroy date range
              destroyDate("#date_from");
              destroyDate("#date_to");
  
              // Initialize date range
              dateFrom("#date_from", "#date_to");
              dateTo("#date_from", "#date_to");
  
              return true;
          }
      });
  
  }
}