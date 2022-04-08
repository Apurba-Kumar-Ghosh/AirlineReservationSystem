import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FlightViewComponent } from './Components/flight-view/flight-view.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { AddFlightComponent } from './Components/add-flight/add-flight.component';
import { BookTicketComponent } from './Components/book-ticket/book-ticket.component';
import { ViewReservationsComponent } from './Components/view-reservations/view-reservations.component';
import { ViewFlightsComponent } from './Components/view-flights/view-flights.component';
import { GenerateReportComponent } from './Components/generate-report/generate-report.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'home',
    component: FlightViewComponent,
    children: [
      { path: 'AddFlight', component: AddFlightComponent },
      { path: 'BookTicket', component: BookTicketComponent },
      { path: 'GenerateReport', component: GenerateReportComponent },
      { path: 'ViewReservations', component: ViewReservationsComponent },
      { path: 'ViewFlights', component: ViewFlightsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
