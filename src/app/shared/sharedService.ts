import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
 public bookingSubject: Subject<any> = new Subject();
 constructor () {}
//  public bookObservable: Observable<any> = this.bookingSource.asObservable()
 addBooking(booking: any) {
  console.log(booking)
  this.bookingSubject.next(booking);
 }
}
