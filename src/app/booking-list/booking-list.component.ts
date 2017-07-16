import { Component} from '@angular/core';
import { SharedService }   from '../shared/sharedService';
import { BookingService }   from '../shared/booking.service';
import { Booking }   from '../shared/booking.model';
import { SortBy } from '../shared/sortBy';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { User } from '../shared/user';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.css'],
})

export class BookingListComponent {
  user = new User();
  displayDate: string;
  public bookingDate: Date = new Date();
  bookings: Booking[];
  constructor(
    private sharedService: SharedService,
    private bookingService: BookingService,
    private toastr: ToastsManager
  ) {}
  getBookings(): void {
    this.bookingService.getBookings().then(bookings => {
      bookings.map((booking) => {
        booking.endTime = moment(booking.date)
          .add(booking.duration, 'minutes')
          .toISOString();
      });
      this.bookings = bookings;
      this.sharedService.bookingListChangedBroadcast.next(this.bookings);
    });
  }
  ngOnInit(): void {
    this.sharedService.bookingSubject
      .subscribe((booking) => {
        const sortBy = new SortBy();
        this.bookings.push(booking);
        this.bookings = sortBy.orderByDate(this.bookings);
        this.sharedService.bookingListChangedBroadcast.next(this.bookings);
      });
    this.sharedService.editBookingListSubject
      .subscribe((booking) => this.update(booking));

    this.sharedService.bookingDateChangedBroadcast.next(this.bookingDate);
    this.getBookings();
    this.displayDate = moment().format('YYYY-MM-DD');
  }

  delete(event: Event, booking: Booking): void {
    event.preventDefault();
    this.bookingService
      .delete(booking.id)
      .then( () => {
        this.bookings = this.bookings.filter( reservation => reservation !== booking);
        this.sharedService.bookingListChangedBroadcast.next(this.bookings);
      });
  }

  update(booking: Booking): void {
    console.log('update book listing');
    this.bookings = this.bookings
      .map( reservation => reservation.id === booking.id
        ? booking
        : reservation
      );
  }

  triggerEdit(event: Event, booking: Booking): void {
    event.preventDefault();
    let bookingDate = moment(booking.bookedDate);
    let now = moment();
    if ( now.diff(bookingDate, 'minutes') > 2  ) {
      this.toastr.error('Cannot edit booking which has been made more than 2 minutes ago.');
      return;
    }
    this.sharedService.editBooking(booking);
  }
}
