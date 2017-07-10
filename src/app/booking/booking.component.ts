import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService }   from '../shared/sharedService';
import { BookingService }   from '../shared/booking.service';
import { Booking }   from '../shared/booking.model';
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
   startDateTime: moment().toISOString()
 };
 isNew = true;
 bookingDate: any;

 constructor(private sharedService: SharedService, private bookingService: BookingService) {}

 addBooking(event: any, form: NgForm ): void {
   const hour = parseInt(form.value.time.split(':')[0], 10)
   const minute = parseInt(form.value.time.split(':')[1], 10)
   let dateTime = moment(this.bookingDate)
   dateTime.set({
     'hour': hour,
     'minute': minute,
     'second': 0,
     'millisecond': 0
   })
  this.bookingService.add({
    name: 'Tester',
    avatar: 'man-2.svg',
    time: form.value.time,
    date: dateTime.toISOString(),
    duration: form.value.duration
  }).then( booking => this.sharedService.addBooking(booking))
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
