import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService }   from '../shared/sharedService';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent {
 constructor(private sharedService: SharedService) {}
 onClick(event: any, form: NgForm ): void {
  this.sharedService.addBooking({
    name: 'Test1',
    avatar: 'man-2.svg',
    startTime: form.value.time,
    duration: form.value.duration
  });
 }
}
