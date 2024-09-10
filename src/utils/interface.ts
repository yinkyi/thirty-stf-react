import { User } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { FlightSchedule } from '../libs/apiResponseInterface';

export interface TemplateProps {
  children: ReactNode;
}
export interface IAuth {
  isAuth: boolean;
  accessToken: string | null;
  user?: User;
}

export interface IBooking {
  noOfPassenger: number;
  depatureFlight: FlightSchedule | null;
  returnFlight: FlightSchedule | null;
}

export interface IinitialState {
  auth: IAuth;
  booking: IBooking | null;
}

// Interface for flight details
interface Flight {
  date: string; // ISO 8601 date-time string
  flightScheduleId: string; // UUID
  unitPrice: number;
}

// Interface for passenger details
interface Passenger {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO 8601 date string
  nationality: string;
  passportNumber: string;
  passportExpireDate: string; // ISO 8601 date string
}

// Interface for contact details
interface ContactDetail {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

// Interface for the main booking request
export default interface BookingRequest {
  paymentType: string; // e.g., "credit/debit"
  flights: Flight[];
  passengers: Passenger[];
  contactDetail: ContactDetail;
}

export interface errorFormat {
  status: number;
  message: string[];
}
