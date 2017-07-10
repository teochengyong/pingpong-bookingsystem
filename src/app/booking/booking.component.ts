import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService }   from '../shared/sharedService';
import { BookingService }   from '../shared/booking.service';
import { Booking }   from '../shared/booking.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import * as moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent {
 booking: Booking = {
   id: 0,
   name: 'Tester',
   avatar: 'man-01.svg',
   duration: 10,
   endTime: moment().toISOString(),
   date: moment().toISOString(),
   bookedDate: moment().toISOString()
 };
 isNew = true;
 bookingDate: any;
 bookings: Booking[];

 constructor(
  private sharedService: SharedService,
  private bookingService: BookingService,
  private toastr: ToastsManager
  ) {}

 addBooking(event: any, form: NgForm ): void {
   if (!this.validateBooking(form) ) {
     return;
   };

   if (this.validateOverlappedBooking() ) {
    return;
   }

  const date = this.getBookingDate(form);
  this.bookingService.add({
    name: 'Tester',
    avatar: 'man-2.svg',
    date: date,
    duration: form.value.duration,
    endTime: this.getEndTime(date, form.value.duration),
    bookedDate: moment().toISOString()
  }).then( booking => {
    this.toastr.success('Booking successfully created');
    this.sharedService.addBooking(booking)
  })
 }

 ngOnInit(): void {
  this.sharedService.editBookingSubject.subscribe(booking => {
    this.booking = booking;
    this.isNew = false;
  });
  this.sharedService.bookingDateChangedBroadcast.subscribe(date => {
    this.bookingDate = date;
  });
  this.sharedService.bookingListChangedBroadcast.subscribe(bookings => {
    this.bookings = bookings;
  });
 }

 updateBooking(event: any, booking: NgForm): void {
  if (!this.validateBooking(booking)) {
     return;
  };

  this.booking.date = this.getBookingDate(booking);
  this.booking.duration = booking.value.duration;
  this.booking.endTime = this.getEndTime(this.booking.date, booking.value.duration);
  this.bookingService
    .update(this.booking)
    .then( resBooking => {
      this.sharedService.editBookingList(booking);
    });
  };

  private getBookingDate(booking: NgForm): string {
    const hour = parseInt(booking.value.time.split(':')[0], 10)
    const minute = parseInt(booking.value.time.split(':')[1], 10)
    let dateTime = moment(this.booking.date).set({
      'hour': hour,
      'minute': minute,
      'second': 0,
      'millisecond': 0
    });
    return dateTime.toISOString()
  }

  private getEndTime(date:string, duration: number ): string {
    return moment(date)
          .add( duration, 'minutes')
          .toISOString()
  }

  private validateBooking(booking: NgForm): boolean {
    if(!booking.value.time || !booking.value.duration ) {
      this.toastr.error('Unable to book due to missing fields.');
      return false;
    };
    return true;
  }

  private validateOverlappedBooking(): boolean {
    console.log('Overlapped Bookings');
    console.log(this.bookings);
    return true;
  }

  cancel(event: any): void {
    this.isNew = true;
    this.booking.duration = 10;
  }
}
