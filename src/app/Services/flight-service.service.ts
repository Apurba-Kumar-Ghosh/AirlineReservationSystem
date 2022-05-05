import { Injectable } from '@angular/core';
import { Flight } from '../flight';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightServiceService {
  constructor(private http: HttpClient) {}

  addFlight(flight: Flight) {
    return this.http.post(
      'http://airlinesprint.azurewebsites.net/api/Flights',
      flight,
      {
        responseType: 'text',
      }
    );
    // POST req to add flight
  }
  removeFlight(flightId: string): Observable<any> {
    return this.http.delete('http://localhost:28217/api/Flights', {
      params: { FlightID: flightId },
    });
  }
  getAllFlights(Source?: string, Destination?: string): Observable<any> {
    // GET request to get all flights
    return this.http.get('http://airlinesprint.azurewebsites.net/api/Flights', {
      params: { Origin: Source, Destination: Destination },
      responseType: 'json',
    });
  }
}
