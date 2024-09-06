export interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
}

export interface Airline {
  id: string;
  name: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: Airline;
}

export interface FlightSchedule {
  id: string;
  flightId: string;
  type: string;
  depatureAirportId: string;
  arrivalAirportId: string;
  depatureDate: string; // ISO 8601 date string
  arrivalDate: string; // ISO 8601 date string
  depatureTime: string; // ISO 8601 date string
  arrivalTime: string; // ISO 8601 date string
  duration: string;
  unitPrice: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  deletedAt: string | null;
  arrivalAirport: Airport;
  departureAirport: Airport;
  flight: Flight;
}

interface BookingFlight {
  id: string;
  bookingId: string;
  date: string; // ISO 8601 date format
  flightScheduleId: string;
  unitPrice: string; // Assuming this is a string based on your example
  createdAt: string; // ISO 8601 date format
  updatedAt: string; // ISO 8601 date format
  deletedAt: string | null; // ISO 8601 date format or null
}

export interface BookingData {
  id: string;
  referenceNumber: string;
  userId: string;
  currency: string;
  paymentType: string;
  status: string;
  totalPassenger: number;
  createdAt: string; // ISO 8601 date format
  updatedAt: string; // ISO 8601 date format
  deletedAt: string | null; // ISO 8601 date format or null
  bookingFlights: BookingFlight[];
  clientSecrect: string; // It seems like there's a typo: should be "clientSecret"
}

export interface User {
  id: string;
  auth0UserId: string;
  roleId: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string; // ISO 8601 date format
  updatedAt: string; // ISO 8601 date format
  deletedAt: string | null; // ISO 8601 date format or null
}
