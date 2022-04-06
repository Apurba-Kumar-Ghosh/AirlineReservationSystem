import { Injectable } from '@angular/core';
import { Flight } from '../flight';

@Injectable({
  providedIn: 'root',
})
export class FlightServiceService {
  public flights: Flight[];
  constructor() {
    this.flights = [];
  }
  addFlight(flight: Flight) {
    this.flights.push(flight);
    // POST req to add flight
  }
  getAllFlights(): Flight[] {
    for (let i = 0; i < 10; i++) {
      let flightOne = new Flight();
      this.fillDetails(flightOne, i);
    }
    return this.flights;
    // GET request to get all flights
  }
  // for filling temporary data;
  fillDetails(flight: Flight, index: number) {
    flight.FlightId = index.toString();
    flight.ArrivalTime = '10:00pm';
    flight.DeptTime = '9:00pm';
    flight.Destination = 'Lucknow';
    flight.Origin = 'Kolkata';
    flight.Fare = index * 1000;
    flight.NoOfSeats = index * 50;
    flight.LaunchDate = new Date();
    this.flights.push(flight);
  }
}
