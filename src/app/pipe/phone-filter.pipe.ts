import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'util';

@Pipe({
  name: 'phoneFilter'
})
export class PhoneFilterPipe implements PipeTransform {

  transform(phone?: string): string {

    phone = phone ? phone : '';

    phone = phone.trim();

    const pa: string[] = phone.split("_");

    if(typeof (pa) == undefined || pa.length > 1 || pa[0].length != 14){
        return '';
    }  else {
        //(444) 444-4444
        let currentPhone = '0' + pa[0].charAt(1) + pa[0].charAt(2) + pa[0].charAt(3) + pa[0].charAt(6) + pa[0].charAt(7) 
                    + pa[0].charAt(8) + pa[0].charAt(10) + pa[0].charAt(11) + pa[0].charAt(12) + pa[0].charAt(13);
      /*
        for (var i = 0; i < pa[0].length; i++) {
            if(isNumber(pa[0].charAt(i))){
                currentPhone = currentPhone + pa[0].charAt(i);
            }
          }*/

        return currentPhone;
    }
  }
}