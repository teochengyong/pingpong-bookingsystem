import { InMemoryDbService }  from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bookings = [
      {
        id: 1,
        name: 'Teo Cheng Yong',
        avatar: 'boy-1.svg',
        time: '09:00',
        date: '2017-07-10T12:00:00.000Z',
        duration: 20
      },
      {
        id: 2,
        name: 'Ashlyn',
        avatar: 'girl-1.svg',
        date: '2017-07-10T10:00:00.000Z',
        time: '10:00',
        duration: 60
      },
      {
        id: 3,
        name: 'Tom Bayers',
        avatar: 'man-1.svg',
        time: '8:20',
        date: '2017-07-10T09:00:00.000Z',
        duration: 20
      }
    ];
    return {bookings}
  }
}
