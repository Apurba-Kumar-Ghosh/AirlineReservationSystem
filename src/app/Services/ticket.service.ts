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

  bookTicket(ticket: Ticket): Observable<string> {
    // POST req for saving reservation;
    return this.http.post('http://localhost:28217/api/Reservations', ticket, {
      responseType: 'text',
    });
  }

  getAllTickets(passengerName: string): Observable<any> {
    // GET req to get all the tickets of that person
    return this.http.get('http://localhost:28217/api/Reservations', {
      params: { PassengerName: passengerName },
    });
  }
  cancelTicket(ticketNo: number) {
    //PUT request to set Status = 'Cancelled'
    return this.http.put(
      'http://localhost:28217/api/Reservations/' + ticketNo,
      {
        status: 'Cancelled',
      }
    );
  }
}
