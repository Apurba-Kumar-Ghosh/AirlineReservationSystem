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
  public isLoading: boolean;
  constructor(private ticketService: TicketService) {
    this.tickets = [];
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.getTickets();
  }
  cancelTicket(id: number) {
    this.ticketService.cancelTicket(id).subscribe((res) => {
      this.tickets = [];
      this.fillDetails(res);
    });
  }
  getTickets(): void {
    this.ticketService
      .getAllTickets(sessionStorage.getItem('UserName') || '')
      .subscribe((res) => {
        console.log(res);
        this.fillDetails(res);
      });
  }
  fillDetails(res: any) {
    res.map((res: any) => {
      let temp = new Ticket();
      temp.FlightId = res.flightID;
      temp.ContactNo = res.contactNo;
      temp.DateOfBooking = res.dateOfBooking;
      temp.Email = res.email;
      temp.JourneyDate = res.journeyDate;
      temp.TicketNo = res.ticketNo;
      temp.TotalFare = res.totalFare;
      temp.Status = res.status;
      temp.PassengerName = res.passengerName;
      temp.NoOfTickets = res.noOfTickets;
      this.tickets.push(temp);
    });
  }
}
