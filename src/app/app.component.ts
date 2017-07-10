import { Component, ViewContainerRef } from '@angular/core';
import { SharedService } from './shared/sharedService';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
 constructor(
   private sharedService: SharedService,
   public toastr: ToastsManager,
   vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.sharedService.bookingSubject.subscribe((booking: any) => {
      console.log('Received booking in app.component');
      console.log(booking);
    });
 }
}
