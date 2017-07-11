import { InMemoryDbService }  from 'angular-in-memory-web-api';
import * as moment from 'moment';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bookings = [
      {
        id: 1,
        name: 'Teo Cheng Yong',
        userId: 1,
        avatar: 'boy-1.svg',
        date: moment().set({
          'hour': 12,
          'minute': 0,
          'second': 0,
          'millisecond': 0
        }).toISOString(),
        endTime: moment().set({
          'hour': 12,
          'minute': 20,
          'second': 0,
          'millisecond': 0
        }).toISOString(),
        bookedDate: moment().set({
          'hour': 0,
          'minute': 0,
          'second': 0,
          'millisecond': 0
        }).toISOString(),
        duration: 20
      },
      {
        id: 2,
        name: 'Ashlyn',
        userId: 2,
        avatar: 'girl-1.svg',
        date: moment().set({
          'hour': 10,
          'minute': 0,
          'second': 0,
          'millisecond': 0
        }).toISOString(),
        endTime: moment().set({
          'hour': 11,
          'minute': 0,
          'second': 0,
          'millisecond': 0
        }).toISOString(),
        bookedDate: moment().set({
          'hour': 0,
          'minute': 0,
          'second': 0,
          'millisecond': 0
        }).toISOString(),
        duration: 60
      },
      {
        id: 3,
        name: 'Tom Bayers',
        userId: 3,
        avatar: 'man-1.svg',
        date: moment().set({
          'hour': 9,
          'minute': 0,
          'second': 0,
          'millisecond': 0
        }).toISOString(),
        endTime: moment().set({
          'hour': 9,
          'minute': 20,
          'second': 0,
          'millisecond': 0
        }).toISOString(),
        bookedDate: moment().set({
          'hour': 0,
          'minute': 0,
          'second': 0,
          'millisecond': 0
        }).toISOString(),
        duration: 20
      }
    ];
    return {bookings}
  }
}
