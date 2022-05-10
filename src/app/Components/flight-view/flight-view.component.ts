import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flight-view',
  templateUrl: './flight-view.component.html',
  styleUrls: ['./flight-view.component.css'],
})
export class FlightViewComponent implements OnInit {
  public isAdmin: boolean;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.isAdmin = sessionStorage.getItem('isAdmin') ? true : false;
  }

  ngOnInit(): void {
    // this.router.navigate(['ViewFlights'], { relativeTo: this.route });
  }
  logout(): void {
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('token');
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
