import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService }   from '../shared/sharedService';
import { BookingService }   from '../shared/booking.service';
import { Booking }   from '../shared/booking.model';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent {
 constructor(private sharedService: SharedService, private bookingService: BookingService) {}
 onClick(event: any, form: NgForm ): void {
  this.bookingService.add({
    name: 'Test1',
    avatar: 'man-2.svg',
    startTime: form.value.time,
    duration: form.value.duration
  }).then( booking => this.sharedService.addBooking(booking))
 }
}
