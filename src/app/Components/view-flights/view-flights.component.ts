import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/flight';
import { FlightServiceService } from 'src/app/Services/flight-service.service';

@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css'],
})
export class ViewFlightsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'origin',
    'destination',
    'fare',
    'capacity',
  ];
  public flights: Flight[];
  public Destination: string;
  public Source: string;
  public isAdmin: boolean;
  public date: Date;
  constructor(
    private flightService: FlightServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.flights = [];
    this.date = new Date();
    this.Destination = 'Kolkata';
    this.Source = 'Lucknow';
    this.isAdmin = !!sessionStorage.getItem('isAdmin');
  }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.displayedColumns.push('delete', 'edit', 'status');
    } else {
      this.displayedColumns.push('booking');
    }
    // this.flightService.getAllFlights('', '', this.date).subscribe((res) => {
    //   this.flights = [];
    //   res.flightAndSeats.map((flight: any) => {
    //     var temp = new Flight();
    //     temp.FlightId = flight.flightID;
    //     temp.Fare = flight.fare;
    //     temp.ArrivalTime = flight.arrivalTime;
    //     temp.Destination = flight.destination;
    //     temp.Origin = flight.origin;
    //     temp.NoOfSeats = flight.noOfSeats;
    //     temp.LaunchDate = flight.launchDate;
    //     temp.DeptTime = flight.deptTime;
    //     temp.NoOfSeatsAvailable = flight.noOfSeatsAvailable;
    //     this.flights.push(temp);
    //   });
    // });
  }

  onSubmit(form: NgForm) {
    this.flightService
      .getAllFlights(this.Source, this.Destination, this.date)
      .subscribe((res) => {
        this.flights = [];
        res.flightAndSeats.map((flight: any) => {
          var temp = new Flight();
          temp.FlightId = flight.flightID;
          temp.Fare = flight.fare;
          temp.ArrivalTime = flight.arrivalTime;
          temp.Destination = flight.destination;
          temp.Origin = flight.origin;
          temp.NoOfSeats = flight.noOfSeats;
          temp.LaunchDate = flight.launchDate;
          temp.DeptTime = flight.deptTime;
          temp.NoOfSeatsAvailable = flight.noOfSeatsAvailable;
          temp.Status = flight.status;
          this.flights.push(temp);
        });
      });
  }
  removeFlight(flightId: string) {
    if (sessionStorage.getItem('isAdmin'))
      this.flightService.removeFlight(flightId).subscribe((res) => {
        this.flights = [];
        res.flightAndSeats.map((flight: any) => {
          var temp = new Flight();
          temp.FlightId = flight.flightID;
          temp.Fare = flight.fare;
          temp.ArrivalTime = flight.arrivalTime;
          temp.Destination = flight.destination;
          temp.Origin = flight.origin;
          temp.NoOfSeats = flight.noOfSeats;
          temp.LaunchDate = flight.launchDate;
          temp.DeptTime = flight.deptTime;
          this.flights.push(temp);
        });
      });
    else {
      window.alert('You dont have delete privileges');
    }
  }
  generateReport(flightId: string) {}
}
