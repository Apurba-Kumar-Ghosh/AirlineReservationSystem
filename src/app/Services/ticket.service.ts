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

  bookTicket(ticket: Ticket): Observable<any> {
    // POST req for saving reservation;
    return this.http.post(
      'http://cg-ars.azurewebsites.net/reservations/book-ticket',
      ticket,
      {
        responseType: 'json',
      }
    );
  }

  getAllTicketsByPassengerName(passengerName: string): Observable<any> {
    // GET req to get all the tickets of that person
    return this.http.get(
      'http://cg-ars.azurewebsites.net/reservations/get-ticket-by-passenger-name',
      {
        params: { PassengerName: passengerName },
      }
    );
  }
  getTicketById(id: number): Observable<any> {
    return this.http.get(
      'http://cg-ars.azurewebsites.net/reservations/get-ticket-by-id',
      {
        params: {
          id: id,
          PassengerName: sessionStorage.getItem('UserName'),
        },
      }
    );
  }
  cancelTicket(ticketNo: number): Observable<any> {
    //PUT request to set Status = 'Cancelled'
    return this.http.delete(
      'http://cg-ars.azurewebsites.net/reservations/cancel-ticket',
      {
        params: {
          TicketNo: ticketNo,
        },
      }
    );
  }
}
