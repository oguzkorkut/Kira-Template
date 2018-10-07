import { Component, OnInit } from '@angular/core';
import { User } from '../../../entity/user';
import { CONSTANTS } from '../../../service/constants';
import { NotificationsService } from 'angular2-notifications';
import { KiraService } from '../../../service/kira.service';
import { PhoneFilterPipe } from '../../../pipe/phone-filter.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: [
    './customer-create.component.css'
  ]
})
export class CustomerCreateComponent implements OnInit {

  public options = {
    position: ['top', 'right'],
    timeOut: 3000,
    lastOnTop: true
  };

  public mask: Array<string | RegExp>;

  public loading = false;

  user: User;

  public personelInfoForm: FormGroup;
  public communicationInfoForm: FormGroup;
  public systemInfoForm: FormGroup;

  constructor(private  phoneFilter: PhoneFilterPipe, 
              private kiraService: KiraService, 
              private notificationsService: NotificationsService) { 

      this.mask = CONSTANTS.phoneMask;
  }


  ngOnInit() {
    this.user = new User;

    this.createPersonelInfoFormGroup();
    this.createCommunicationInfoFormGroup();
    this.createSystemInfoFormGroup();

  }


  createPersonelInfoFormGroup(){
    const firstname= new FormControl('', Validators.required);
    const surname= new FormControl('', Validators.required);
    const tckn= new FormControl('', [Validators.required, CustomValidators.gt(10000000000)]);
    const vkn= new FormControl('', [Validators.required, CustomValidators.gt(-1)]);

    this.personelInfoForm = new FormGroup({
        firstname: firstname,
        surname: surname,
        tckn: tckn,
        vkn: vkn
    });
}

createCommunicationInfoFormGroup(){
  const phone= new FormControl('', [Validators.required, CustomValidators.gt(0)]);
  const email= new FormControl('', [Validators.required, CustomValidators.gt(0)]);

  this.communicationInfoForm = new FormGroup({
      phone: phone,
      email: email
  });
}

createSystemInfoFormGroup(){
  const username= new FormControl('', [Validators.required, CustomValidators.gt(0)]);
  const profession= new FormControl('', [Validators.required, CustomValidators.gt(0)]);
  const password= new FormControl('', [Validators.required, CustomValidators.gt(-1)]);
  const repassword= new FormControl('', [Validators.required, CustomValidators.gt(-1)]);
  const smscode= new FormControl('', Validators.required);

  this.systemInfoForm = new FormGroup({
      username: username,
      profession: profession,
      password: password,
      repassword: repassword,
      smscode: smscode
  });
}

  cancel(){

  }
  
  save(){

  }

}