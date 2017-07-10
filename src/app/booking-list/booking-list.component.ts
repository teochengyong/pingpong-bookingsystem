import { Component} from '@angular/core';
import { SharedService }   from '../shared/sharedService';
import { BookingService }   from '../shared/booking.service';
import { Booking }   from '../shared/booking.model';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.css'],
})

export class BookingListComponent {
  displayDate: string;
  startDate: Date = new Date();
  bookings: Booking[];
  constructor(private sharedService: SharedService, private bookingService: BookingService ) {}
  getBookings(): void {
    this.bookingService.getBookings().then(bookings => this.bookings = bookings);
  }
  ngOnInit(): void {
    this.sharedService.bookingSubject
      .subscribe((booking) => {
        console.log('We are at booking list');
        this.bookings.push(booking);
      });
    this.sharedService.editBookingListSubject
      .subscribe((booking) => this.update(booking));
    this.getBookings();
    this.displayDate = moment().format('YYYY-MM-DD');
  }

  delete(booking: Booking): void {
    this.bookingService
      .delete(booking.id)
      .then( () => {
        this.bookings = this.bookings.filter( reservation => reservation !== booking);
      });
  }

  update(booking: Booking): void {
    console.log('update book listing')
    this.bookings = this.bookings
      .map( reservation => reservation.id === booking.id
        ? booking
        : reservation
      )
  }

  triggerEdit(booking: Booking): void {
    this.sharedService.editBooking(booking)
  }
}
