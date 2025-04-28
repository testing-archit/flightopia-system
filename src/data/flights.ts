
export interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  availableSeats: number;
}

export const featuredFlights: Flight[] = [
  {
    id: '1',
    flightNumber: 'FS1234',
    origin: 'SFO',
    destination: 'JFK',
    departureTime: new Date('2023-06-15T08:00:00'),
    arrivalTime: new Date('2023-06-15T16:30:00'),
    price: 349.99,
    availableSeats: 23,
  },
  {
    id: '2',
    flightNumber: 'FS5678',
    origin: 'LAX',
    destination: 'ORD',
    departureTime: new Date('2023-06-16T10:15:00'),
    arrivalTime: new Date('2023-06-16T16:45:00'),
    price: 289.99,
    availableSeats: 8,
  },
  {
    id: '3',
    flightNumber: 'FS9012',
    origin: 'MIA',
    destination: 'SEA',
    departureTime: new Date('2023-06-17T14:30:00'),
    arrivalTime: new Date('2023-06-17T21:15:00'),
    price: 399.99,
    availableSeats: 15,
  }
];
