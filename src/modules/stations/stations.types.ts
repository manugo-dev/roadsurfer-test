export interface StationBooking {
  customerName: string;
  endDate: string;
  id: string;
  pickupReturnStationId: string;
  startDate: string;
}

export interface Station {
  id: string;
  name: string;
  bookings: StationBooking[];
}
