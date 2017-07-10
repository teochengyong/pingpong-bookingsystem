import { Component } from '@angular/core';
import { SharedService } from './shared/sharedService';
export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [SharedService]
})
export class AppComponent {
 constructor(private sharedService: SharedService) {
   this.sharedService.bookingSubject.subscribe((booking: any) => {
    console.log('Received booking in app.component');
    console.log(booking);
   });
 }
}
