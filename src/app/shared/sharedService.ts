import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class SharedService {
  public bookingSubject: Subject<any> = new Subject();
  public editBookingSubject: Subject<any> = new Subject();
  public editBookingListSubject: Subject<any> = new Subject();
  public bookingDateChangedBroadcast: Subject<any> = new ReplaySubject();
  public bookingListChangedBroadcast: Subject<any> = new ReplaySubject();
  public userChangedBroadcast: Subject<any> = new Subject();
  public loginBroadcast: Subject<any> = new Subject();

  constructor() { }
  addBooking(booking: any) {
    console.log(booking);
    this.bookingSubject.next(booking);
  }

  editBooking(booking: any) {
    this.editBookingSubject.next(booking);
  }

  editBookingList(booking: any) {
    this.editBookingListSubject.next(booking);
  }

  bookingDateChanged(date: any) {
    console.log('bookingDateChanged');
    this.bookingDateChangedBroadcast.next(date);
  }

  bookingListChanged(bookings: any) {
    console.log('bookingDateChanged');
    this.bookingListChangedBroadcast.next(bookings);
  }

  userChanged(user: any ) {
    console.log('userChanged');
    this.userChangedBroadcast.next(user);
  }

  loginTriggered(option: object) {
    this.loginBroadcast.next(option);
  }
}
