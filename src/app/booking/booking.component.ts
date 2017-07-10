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
 booking: Booking = {
   name: 'Tester',
   avatar: 'man-01.svg',
   duration: 10,
   time: '08:00'
 };
 isNew = true;
 constructor(private sharedService: SharedService, private bookingService: BookingService) {}
 onClick(event: any, form: NgForm ): void {
  this.bookingService.add({
    name: 'Tester',
    avatar: 'man-2.svg',
    time: form.value.time,
    duration: form.value.duration
  }).then( booking => this.sharedService.addBooking(booking))
 }
 ngOnInit(): void {
  this.sharedService.editBookingSubject.subscribe(booking => {
    this.booking = booking;
    this.isNew = false;
  });
 }
 updateBooking(event: any, booking: NgForm): void {
  this.bookingService
    .update(Object.assign(this.booking, booking.value))
    .then( resBooking => {
      console.log(resBooking)
      this.sharedService.editBookingList(booking);
    });
  };

  cancel(event: any): void {
    this.isNew = true;
    this.booking.duration = 10;
    this.booking.time = '08:00';
  }
}
