import { Component} from '@angular/core';
import { SharedService }   from '../shared/sharedService';
import { BookingService }   from '../shared/booking.service';
import { Booking }   from '../shared/booking.model';
import { SortBy } from '../shared/sortBy';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.css'],
})

export class BookingListComponent {
  displayDate: string;
  public bookingDate: Date = new Date();
  bookings: Booking[];
  constructor(private sharedService: SharedService, private bookingService: BookingService ) {}
  getBookings(): void {
    this.bookingService.getBookings().then(bookings => this.bookings = bookings);
  }
  ngOnInit(): void {
    this.sharedService.bookingSubject
      .subscribe((booking) => {
        const sortBy = new SortBy();
        this.bookings.push(booking);
        this.bookings = sortBy.orderByDate(this.bookings);
      });
    this.sharedService.editBookingListSubject
      .subscribe((booking) => this.update(booking));

    this.sharedService.bookingDateChangedBroadcast.next(this.bookingDate);
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
