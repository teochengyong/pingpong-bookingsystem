import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
 public bookingSubject: Subject<any> = new Subject();
 public editBookingSubject: Subject<any> = new Subject();
 public editBookingListSubject: Subject<any> = new Subject();
 constructor () {}
 addBooking(booking: any) {
  console.log(booking);
  this.bookingSubject.next(booking);
 }

 editBooking(booking: any) {
  this.editBookingSubject.next(booking);
 }

 editBookingList(booking: any ) {
   console.log('editBookingList');
   this.editBookingListSubject.next(booking);
 }
}
