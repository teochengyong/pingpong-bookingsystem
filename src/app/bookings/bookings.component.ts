import { Component } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
})
export class BookingsComponent {}
