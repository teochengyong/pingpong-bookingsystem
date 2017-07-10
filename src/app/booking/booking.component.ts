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
   time: '08:00',
   endTime: moment().toISOString(),
   date: moment().toISOString(),
   bookedDate: moment().toISOString()
 };
 isNew = true;
 bookingDate: any;

 constructor(
  private sharedService: SharedService,
  private bookingService: BookingService,
  private toastr: ToastsManager
  ) {}

 addBooking(event: any, form: NgForm ): void {
   if(!form.value.time || !form.value.duration ) {
     this.toastr.error('Unable to book due to missing fields.');
     return;
   };
   const hour = parseInt(form.value.time.split(':')[0], 10)
   const minute = parseInt(form.value.time.split(':')[1], 10)
   let dateTime = moment(this.bookingDate)
   dateTime.set({
     'hour': hour,
     'minute': minute,
     'second': 0,
     'millisecond': 0
   })
   const date = dateTime.toISOString()
  this.bookingService.add({
    name: 'Tester',
    avatar: 'man-2.svg',
    time: form.value.time,
    date: date,
    duration: form.value.duration,
    endTime: moment(date)
          .add( form.value.duration, 'minutes')
          .toISOString(),
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
 }

 updateBooking(event: any, booking: NgForm): void {
  this.bookingService
    .update(Object.assign(this.booking, booking.value))
    .then( resBooking => {
      this.sharedService.editBookingList(booking);
    });
  };

  cancel(event: any): void {
    this.isNew = true;
    this.booking.duration = 10;
    this.booking.time = '08:00';
  }
}
