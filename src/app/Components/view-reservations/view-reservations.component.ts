import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/Services/ticket.service';
import { Ticket } from 'src/app/ticket';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css'],
})
export class ViewReservationsComponent implements OnInit {
  public tickets: Ticket[];
  constructor(private ticketService: TicketService) {
    this.tickets = [];
  }

  ngOnInit(): void {
    this.tickets = this.ticketService.getAllTickets(
      sessionStorage.getItem('userName') || ''
    );
  }
  cancelTicket(id: number) {
    this.ticketService.cancelTicket(id);
  }
}
