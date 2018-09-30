import { isNull } from 'util';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {transition, trigger, style, animate} from '@angular/animations';
import swal from 'sweetalert2';
import { PhoneFilterPipe } from '../../../pipe/phone-filter.pipe';
import {CustomValidators} from 'ng2-validation';
import { CONSTANTS } from '../../../service/constants';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Profession } from '../../../entity/profession';
import { NgForm } from '@angular/forms';
import { KiraService } from '../../../service/kira.service';
import { ReturnModel } from '../../../entity/ReturnModel';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { City } from '../../../entity/city';
import { NotificationsService } from 'angular2-notifications';
 

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

declare var jquery:any;
declare var $:any;

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
  nextValueSteps1 = "Başvur";
  previousValueStep = "Geri";
  doneValueStep = "Başvuruyu Tamamla";

  cities: City[] = [];
  professions: Profession[] = [];

  position = 'bottom-right';

  public options = {
    position : ['bottom', 'right'],
    timeOut : 3000,
    lastOnBottom : true
  };

  /**
   * Step1
   */
  public step1Form: FormGroup;

  /**
   * Kullanici telefon numarasi
   */
  public phoneNumber: string = '';
  public identityNumber: string;
  public isContractRead: boolean = false;
  public contratCheckBox: boolean;

  step1Submitted: boolean = false;
  /**
   * Step1 end
   */

   /**
   * Step2
   */
  public step2Form: FormGroup;

  public userContractAmount: number;
  public userContractExpiry: number;
  public userSalary: number;

  /**
   * Step2 end
   */

  public mask: Array<string | RegExp>;

  isCompleted = false;

  constructor(private  phoneFilter: PhoneFilterPipe, 
              private kiraService: KiraService, 
              private toastyService: ToastyService, 
              private notificationsService: NotificationsService) {

    this.mask = CONSTANTS.phoneMask;
    
    this.createStep1FormGroup();

    this.createStep2FormGroup();

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

  createStep2FormGroup(){
    const userSalary= new FormControl('', Validators.required);
    const userContractExpiry= new FormControl('', Validators.required);
    const userContractAmount= new FormControl('', Validators.required);

    this.step2Form = new FormGroup({
      userSalary: userSalary,
      userContractExpiry: userContractExpiry,
      userContractAmount: userContractAmount
    });
  }

  ngOnInit() {
    
    this.getCities();
    this.getProfessions();
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

  closeContractText(event, isContractRead:boolean) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
    if(isContractRead && !this.isContractRead){
      this.isContractRead = isContractRead;
    }
  }

/**
 * Step1 onChanges end
 */

 /**
  * Rest Call
  */
 getCities(): void {

  this.kiraService.getCities()
    .then((res: ReturnModel) => {
      if (res.status) {
        this.cities = res.result as City[];
        
        if(this.cities){
          this.notificationsService.success('Bilgi', this.cities.length + " il kaydı çekildi.");
         // this.openToast('warning', 'Bilgi', res.message);
        }
      } else {
        this.notificationsService.error('Hata', res.message);
        //this.openToast('error', 'Hata', res.message);
      }
    })
    .catch((res: Response) => {
      this.notificationsService.error('Hata', res.statusText);
      //this.openToast('error', 'Hata', res.statusText);
    }
  );
}

getProfessions(): void {

  this.kiraService.getProfessions()
    .then((res: ReturnModel) => {

      if (res.status) {
        this.professions = res.result as Profession[];

        if(this.professions){
          this.notificationsService.success('Bilgi', this.professions.length + " meslek kaydı çekildi.");
         //this.openToast('warning', 'Bilgi', res.message);
        }
      } else {
        this.notificationsService.error('Hata', res.message);
        //this.openToast('error', 'Hata', res.message);
      }
    })
    .catch((res: Response) => {
      this.notificationsService.error('Hata', res.statusText);
      //this.openToast('error', 'Hata', res.statusText);
    }
    );
}

  /**
   * Rest Call End
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

  
  openToast2(type: string, title: string, message: string) {
    /**
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
     */
    let options = this.getToastSettings();
    this.position = options["position"] ? options["position"] : 'bottom-right';
    
    const toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: options["showClose"],
      timeout: options["timeout"],
      theme: options["theme"],
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }
  
  getToastSettings(){
    let toastSetting = {
      title : '',
      msg:  '',
      showClose : true,
      timeout : 5000,
      theme : 'bootstrap',
      type : 'wait',
      position:'center-center',
      closeOther:true
    }
    return toastSetting;
  }
}