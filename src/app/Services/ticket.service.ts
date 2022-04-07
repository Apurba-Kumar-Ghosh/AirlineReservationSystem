import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../ticket';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  public tempTickets: Ticket[];
  constructor(private http: HttpClient) {
    this.tempTickets = [];
  }

  bookTicket(ticket: Ticket) {
    Object.keys(ticket).map((key) => console.log(key + ' : ' + ticket[key]));
    // POST req for saving reservation;
    console.log('ticket to be submitted = ' + ticket);
  }

  getAllTickets(passengerName: string): Ticket[] {
    // GET req to get all the tickets of that person
    for (let i = 0; i < 10; i++) {
      let ticket = new Ticket();
      this.fillDetails(ticket, i);
    }
    return this.tempTickets;
  }
  fillDetails(ticket: Ticket, index: number) {
    ticket.ContacNo = 9647085189;
    ticket.DateOfBooking = new Date();
    ticket.Email = '@gmail.com';
    ticket.JourneyDate = new Date();
    ticket.NoOfTickets = 5;
    ticket.Status = 'Booked';
    ticket.PassengerName = 'Apu';
    ticket.TotalFare = 5000;
    ticket.FlightId = index.toString();
    ticket.TicketNo = 5;
    this.tempTickets.push(ticket);
  }
  cancelTicket(ticketNo: number) {
    //PUT request to set Status = 'Cancelled'
    console.log('ticket no ' + ticketNo + 'cancelled');
  }
}
