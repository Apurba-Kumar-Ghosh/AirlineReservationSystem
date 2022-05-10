import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/flight';
import { FlightServiceService } from 'src/app/Services/flight-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  public dataSource: MatTableDataSource<Flight>;
  public Destination: string;
  public Source: string;
  public isAdmin: boolean;
  public date: Date;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
    this.flightService
      .getAllFlights('Lucknow', 'Kolkata', new Date().toISOString())
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
          this.dataSource = new MatTableDataSource(this.flights);
          this.dataSource.paginator = this.paginator;
        });
      });
  }

  onSubmit(form: NgForm) {
    let current = new Date();
    let searchDate = new Date(this.date);
    if (
      (current.getDate() < searchDate.getDate() &&
        searchDate.getMonth() === current.getMonth()) ||
      current.getMonth() < searchDate.getMonth()
    )
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
    else {
      window.alert('Please enter a valid date');
    }
  }
  removeFlight(flightId: string) {
    if (sessionStorage.getItem('isAdmin'))
      this.flightService.removeFlight(flightId).subscribe((res) => {
        if (res.isSuccess === true) {
          this.flights.forEach((f) => {
            if (f.FlightId === flightId) {
              f.Status = 'Inactive';
            }
          });
        }
      });
    else {
      window.alert('You dont have delete privileges');
    }
  }
  generateReport(flightId: string) {}
}
