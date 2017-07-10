import { Component} from '@angular/core';
import { SharedService }   from '../shared/sharedService';
// import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.css'],
})

export class BookingListComponent {
  displayDate: string;
  startDate: Date = new Date();
  bookings: object[] = [
    {
      name: 'Teo Cheng Yong',
      avatar: 'boy-1.svg',
      startTime: '2017-07-09T17:14+8.00',
      duration: 20
    },
    {
      name: 'Ashlyn',
      avatar: 'girl-1.svg',
      startTime: '2017-07-09T08:15+8.00',
      duration: 60
    },
    {
      name: 'Tom Bayers',
      avatar: 'man-1.svg',
      startTime: '2017-07-09T09:15+8.00',
      duration: 20
    }
  ];
  constructor(private sharedService: SharedService) {}
  ngOnInit(): void {
    this.sharedService.bookingSubject
      .subscribe((booking) => {
        console.log('We are at booking list');
        this.bookings.push(booking);
      });
    this.displayDate = moment().format('YYYY-MM-DD');
  }
}
