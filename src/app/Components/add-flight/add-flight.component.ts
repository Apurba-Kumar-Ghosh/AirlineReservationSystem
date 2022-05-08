import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/flight';
import { FlightServiceService } from 'src/app/Services/flight-service.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css'],
})
export class AddFlightComponent implements OnInit {
  public flight: Flight;
  public isLoading: boolean;
  constructor(
    private flightService: FlightServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.flight = new Flight();
    this.isLoading = false;
  }

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.flight.Status = 'Active';
    this.flight.LaunchDate = new Date();
    this.flightService.addFlight(this.flight).subscribe((res) => {
      if (!res.isSuccess) {
        window.alert('This flightId already exists');
        this.flight = new Flight();
      } else {
        this.isLoading = true;
        setTimeout(() => {});
        this.router.navigate(['../ViewFlights'], { relativeTo: this.route });
      }
    });
  }
}
