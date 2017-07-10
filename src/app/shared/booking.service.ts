import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class BookingService {
  private bookingsUrl = 'api/bookings';
  private headers = new Headers({
    'Content-Type': 'application/json'
  })
  constructor(private http: Http) {}

  private handleError (error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }

  getBookings(): Promise<Booking[]> {
    return this.http.get(this.bookingsUrl)
      .toPromise()
      .then( response => response.json().data as Booking[])
      .catch(this.handleError);
  }

  add(booking: object): Promise<Booking> {
    return this.http
      .post(this.bookingsUrl, JSON.stringify(booking), { headers: this.headers})
      .toPromise()
      .then( res => {
        return res.json().data as Booking;
      })
      .catch(this.handleError);
  }
}
