import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { FlightViewComponent } from './Components/flight-view/flight-view.component';
import { AddFlightComponent } from './Components/add-flight/add-flight.component';
import { BookTicketComponent } from './Components/book-ticket/book-ticket.component';
import { ViewReservationsComponent } from './Components/view-reservations/view-reservations.component';
import { ViewFlightsComponent } from './Components/view-flights/view-flights.component';
import { FlightServiceService } from './Services/flight-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FlightViewComponent,
    AddFlightComponent,
    BookTicketComponent,
    ViewReservationsComponent,
    ViewFlightsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [FlightServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
