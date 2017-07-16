import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService }   from '../shared/sharedService';
import { BookingService }   from '../shared/booking.service';
import { Booking, ValidateOverlappedBookingOption }   from '../shared/booking.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { User } from '../shared/user';

import * as moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent {
 user = new User();
 booking: Booking = {
   id: 0,
   userId: this.user.Id,
   name: this.user.name,
   avatar: this.user.avatar,
   duration: 10,
   endTime: moment().toISOString(),
   date: moment().toISOString(),
   bookedDate: moment().toISOString()
 };
 isNew = true;
 bookingDate: any;
 bookings: Booking[];
 private timeFormat = 'h:mm:a';

 constructor(
  private sharedService: SharedService,
  private bookingService: BookingService,
  private toastr: ToastsManager
  ) {}

 addBooking(event: any, form: NgForm ): void {
   if (!this.validateBooking(form) ) {
     return;
   };

  const date = this.getBookingDate(form);
  const endTime = this.getEndTime(date, form.value.duration);
   if (!this.validateOverlappedBooking(date, endTime) ) {
    return;
   }
  this.bookingService.add({
    name: 'Beardy Tester',
    avatar: 'man-2.svg',
    date: date,
    duration: form.value.duration,
    endTime: this.getEndTime(date, form.value.duration),
    bookedDate: moment().toISOString(),
    userId: this.user.Id
  }).then( booking => {
    this.toastr.success('Booking successfully created');
    this.sharedService.addBooking(booking);
  });
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

  const date = this.getBookingDate(booking);
  const endTime = this.getEndTime(date, booking.value.duration);
  if (!this.validateOverlappedBooking(date, endTime, { ignore: this.booking}) ) {
  return;
  }
  this.booking.date = date;
  this.booking.duration = booking.value.duration;
  this.booking.endTime = endTime;
  this.bookingService
    .update(this.booking)
    .then( resBooking => {
      this.sharedService.editBookingList(resBooking);
    });
  this.toastr.success('Successfully updated booking.');
  };

  private getBookingDate(booking: NgForm): string {
    const hour = parseInt(booking.value.time.split(':')[0], 10);
    const minute = parseInt(booking.value.time.split(':')[1], 10);
    let dateTime = moment(this.booking.date).set({
      'hour': hour,
      'minute': minute,
      'second': 0,
      'millisecond': 0
    });
    return dateTime.toISOString();
  }

  private getEndTime(date: string, duration: number ): any {
    return moment(date)
          .add( duration, 'minutes')
          .toISOString();
  }

  private validateBooking(booking: NgForm): boolean {
    if (booking.value.duration < 10 || booking.value.duration > 60  ) {
      this.toastr.error('Please book within 10 to 60 minutes.');
      return false;
    };

    if (!booking.value.time || !booking.value.duration ) {
      this.toastr.error('Unable to book due to missing fields.');
      return false;
    };
    return true;
  }

  private validateOverlappedBooking(start: string, end: string, option?: ValidateOverlappedBookingOption ): boolean {

    let startTime = moment(start);
    let endTime = moment(end);
    let reservations = this.bookings.slice(0);
    if (option && option.ignore) {
      reservations = reservations.filter((reservation) => option.ignore.id !== reservation.id );
    }
    for ( let booking of reservations ) {
      const bookingStartTime = moment(booking.date);
      const bookingEndTime = moment(booking.endTime);
      // Overlaps booking start time
      if ( startTime < bookingStartTime && endTime > bookingStartTime ) {
        this.toastr.error(`The booking end time overlapped with a booking that starts at ${bookingStartTime.format(this.timeFormat)}`);
        return false;
      }
      // Overlaps booking end time
      if ( startTime < bookingEndTime && endTime > bookingEndTime) {
        this.toastr.error(`The booking start time overlapped with a booking that ends at ${bookingEndTime.format(this.timeFormat)}`);
        return false;
      }
      // Within booking period
      if ( startTime >= bookingStartTime && endTime <= bookingEndTime) {
        this.toastr.error(`
        The booking overlapped with a current booking that starts at ${bookingStartTime.format(this.timeFormat)} and
        ends at ${bookingEndTime.format(this.timeFormat)}`);
        return false;
      }

      if (booking.userId === this.user.Id) {
        // 1 hour before current user's booking
        let currentBookingEndTimeWithOneHourExtra = moment(endTime).add(1, 'hours');
        if ( startTime < bookingStartTime && currentBookingEndTimeWithOneHourExtra > bookingStartTime ) {
          this.toastr.error(`
            The booking must have a gap of an hour with your booking that starts at ${bookingStartTime.format(this.timeFormat)}
          `);
          return false;
        }

        // 1 after current user's booking
        let bookingEndTimeWithOneHourExtra = moment(bookingEndTime).add(1, 'hours');
        if ( startTime > bookingEndTime && bookingEndTimeWithOneHourExtra > startTime ) {
          this.toastr.error(`
            The booking must have a gap of an hour with your booking that ends at ${bookingEndTime.format(this.timeFormat)}
          `);
          return false;
        }
      }
    }

    return true;
  }

  cancel(event: any): void {
    this.isNew = true;
  }
}
