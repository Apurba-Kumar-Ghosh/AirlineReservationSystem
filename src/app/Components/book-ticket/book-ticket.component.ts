import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/Services/ticket.service';
import { Ticket } from 'src/app/ticket';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'],
})
export class BookTicketComponent implements OnInit {
  public ticket: Ticket;
  public fare: number;
  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.ticket = new Ticket();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.ticket.FlightId = params['id'];
      this.fare = params['fare'];
    });
  }

  onSubmit(form: NgForm) {
    this.ticket.DateOfBooking = new Date();
    this.ticket.TotalFare = this.fare * form.value.NoOfTickets;
    this.ticket.Status = 'Booked';
    this.ticket.TicketNo = 123;
    this.ticketService.bookTicket(this.ticket);
    this.router.navigate(['../ViewReservations'], { relativeTo: this.route });
  }
}
