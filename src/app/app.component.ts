import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  //template: '<router-outlet><app-spinner></app-spinner></router-outlet>',

  public options = {
    position : ['top', 'right'],
    timeOut : 3000,
    lastOnBottom : true
  };
}
