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
import { TicketService } from './Services/ticket.service';
import { UserService } from './Services/user.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [FlightServiceService, TicketService, UserService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
