import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/flight';
import { FlightServiceService } from 'src/app/Services/flight-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css'],
})
export class EditFlightComponent implements OnInit {
  flightForm = new FormGroup({
    FlightId: new FormControl('', { updateOn: 'submit' }),
    Destination: new FormControl(''),
    Origin: new FormControl(''),
    DeptTime: new FormControl(''),
    ArrivalTime: new FormControl(''),
    Fare: new FormControl(),
    NoOfSeats: new FormControl(),
  });
  public flight: Flight;
  public isLoading: boolean;
  public flightid: number;
  constructor(
    private flightService: FlightServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.flight = new Flight();
    this.isLoading = false;
    this.flightid = undefined;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.flightid = res['flightId'];
    });
    this.flightService.getFlightDetails(this.flightid).subscribe((res) => {
      console.log(res);

      this.saveDetails(res);
    });
  }
  saveDetails(res: any) {
    this.flightForm.setValue({
      FlightId: res.flightID,
      Origin: res.origin,
      Destination: res.destination,
      ArrivalTime: res.arrivalTime,
      DeptTime: res.deptTime,
      Fare: res.fare,
      NoOfSeats: res.noOfSeats,
    });
  }
  onSubmit() {
    this.flight = this.flightForm.value;
    this.flightService.editFlightDetails(this.flight).subscribe((res) => {
      this.router.navigate(['../ViewFlights'], { relativeTo: this.route });
    });
  }
}
