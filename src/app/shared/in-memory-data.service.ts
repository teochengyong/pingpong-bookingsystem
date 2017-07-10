import { InMemoryDbService }  from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bookings = [
      {
        id: 1,
        name: 'Teo Cheng Yong',
        avatar: 'boy-1.svg',
        startTime: '2017-07-09T17:14+8.00',
        duration: 20
      },
      {
        id: 2,
        name: 'Ashlyn',
        avatar: 'girl-1.svg',
        startTime: '2017-07-09T08:15+8.00',
        duration: 60
      },
      {
        id: 3,
        name: 'Tom Bayers',
        avatar: 'man-1.svg',
        startTime: '2017-07-09T09:15+8.00',
        duration: 20
      }
    ];
    return {bookings}
  }
}
