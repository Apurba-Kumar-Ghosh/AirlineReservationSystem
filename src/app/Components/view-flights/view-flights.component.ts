import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/flight';
import { FlightServiceService } from 'src/app/Services/flight-service.service';

@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css'],
})
export class ViewFlightsComponent implements OnInit {
  public flights: Flight[];
  constructor(
    private flightService: FlightServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.flights = this.flightService.getAllFlights();
  }
}
