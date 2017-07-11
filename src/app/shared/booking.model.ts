export class Booking {
  id: number;
  userId: number;
  name: String;
  duration: number;
  avatar: String;
  endTime: String;
  date: string;
  bookedDate: string;
}

export interface ValidateOverlappedBookingOption {
  ignore: Booking;
}
