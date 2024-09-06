import { FlightScheduleFilters } from '../components/SearchResult';
import store, { RootState } from '../store';
import BookingRequest from '../utils/interface';

const api = import.meta.env.VITE_API_URL;

function getToken(): string | null {
  const state: RootState = store.getState();
  return state.auth.accessToken;
}

export async function getAirPort(flightType: string) {
  const token = getToken();
  const res = await fetch(`${api}/airports?type=${flightType}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await res.json();
  return response.data;
}
export async function getFlightSchedule(param: FlightScheduleFilters) {
  const token = getToken();
  let query = `type=${param.flightType}&depatureAirportId=${param.depatureAirportId}&arrivalAirportId=${param.arrivalAirportId}&depatureDate=${param.depatureDate}`;
  query += param.returnDate ? `&returnDate=${param.returnDate}` : '';
  const res = await fetch(`${api}/flights/schedules?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await res.json();
  return response.data;
}

export async function saveUserInfo(idToken: string) {
  const res = await fetch(`${api}/users`, {
    method: 'POST',
    body: JSON.stringify({ idToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await res.json();
  return response.data;
}

export async function saveBooking(data: BookingRequest) {
  const token = getToken();
  const res = await fetch(`${api}/booking`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await res.json();
  return response.data;
}

export async function getProfile() {
  const token = getToken();
  const res = await fetch(`${api}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await res.json();
  return response.data;
}

export async function getBookingByRef(referenceNumber: string) {
  const token = getToken();
  const res = await fetch(`${api}/booking/${referenceNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await res.json();
  return response.data;
}
