import { Injectable } from '@angular/core';
import { Flight } from '../flight';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightServiceService {
  public headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  addFlight(flight: Flight): Observable<any> {
    return this.http.post(
      'http://cg-ars.azurewebsites.net/flights/add-flight',
      flight,
      {
        headers: this.headers.append(
          'authorization',
          sessionStorage.getItem('token')
        ),
        responseType: 'json',
      }
    );
    // POST req to add flight
  }
  removeFlight(flightId: string): Observable<any> {
    return this.http.delete(
      'http://cg-ars.azurewebsites.net/flights/remove-flight',
      {
        params: { id: flightId },
        headers: this.headers.append(
          'authorization',
          sessionStorage.getItem('token')
        ),
      }
    );
  }
  getAllFlights(
    Source: string,
    Destination: string,
    date: any
  ): Observable<any> {
    // GET request to get all flights
    return this.http.get(
      'http://cg-ars.azurewebsites.net/flights/all-flights',
      {
        params: {
          Origin: Source,
          Destination: Destination,
          JourneyDate: date,
          IsAdmin: !!sessionStorage.getItem('isAdmin'),
        },
        responseType: 'json',
      }
    );
  }

  getFlightDetails(flightId: number): Observable<any> {
    return this.http.get(
      'http://cg-ars.azurewebsites.net/flights/flights-by-id',
      {
        params: { id: flightId },
        responseType: 'json',
      }
    );
  }

  editFlightDetails(flight: Flight): Observable<any> {
    return this.http.put(
      'http://cg-ars.azurewebsites.net/flights/edit-flight',
      flight,
      {
        headers: this.headers.append(
          'authorization',
          sessionStorage.getItem('token')
        ),
        responseType: 'json',
      }
    );
  }
}
