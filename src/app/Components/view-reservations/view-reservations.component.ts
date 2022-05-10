import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { TicketService } from 'src/app/Services/ticket.service';
import { Ticket } from 'src/app/ticket';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css'],
})
export class ViewReservationsComponent implements OnInit {
  public displayedColumns: string[] = [
    'TicketId',
    'Name',
    'Phone',
    'Email',
    'Fare',
    'Seats',
    'Status',
  ];
  public tickets: Ticket[];
  public isLoading: boolean;
  public ticketId: number;
  constructor(private ticketService: TicketService) {
    this.tickets = [];
    this.isLoading = false;
  }

  ngOnInit(): void {
    // this.getTickets();
    this.ticketService
      .getAllTicketsByPassengerName(sessionStorage.getItem('UserName') || '')
      .subscribe((res) => {
        console.log(res);
        // this.fillDetails(res);
        if (res.reservation !== null)
          res.reservation.map((tick: any) => {
            var temp = new Ticket();
            temp.FlightId = tick.flightID;
            temp.ContactNo = tick.contactNo;
            temp.DateOfBooking = tick.dateOfBooking;
            temp.Email = tick.email;
            temp.JourneyDate = tick.journeyDate;
            temp.TicketNo = tick.ticketNo;
            temp.TotalFare = tick.totalFare;
            temp.Status = tick.status;
            temp.PassengerName = tick.passengerName;
            temp.NoOfTickets = tick.noOfTickets;
            this.tickets.push(temp);
          });
      });
  }
  cancelTicket(ticket: Ticket) {
    let current = new Date();
    let date = new Date(ticket.JourneyDate);
    if (
      current.getMonth() < date.getMonth() ||
      (current.getMonth() === date.getMonth() &&
        current.getDate() < date.getDate())
    ) {
      this.ticketService.cancelTicket(ticket.TicketNo).subscribe((res) => {
        this.tickets = [];
        if (res.isSuccess) {
          // window.alert(res.message);
        }
      });
    }
  }
  getTickets(): void {
    this.ticketService
      .getAllTicketsByPassengerName(sessionStorage.getItem('UserName') || '')
      .subscribe((res) => {
        console.log(res);
        this.fillDetails(res.reservation);
      });
  }
  getTicketById(): void {
    this.ticketService.getTicketById(this.ticketId).subscribe((res) => {
      this.tickets = [];
      var temp = new Ticket();
      if (res.reservation !== null) {
        temp.FlightId = res.reservation.flightID;
        temp.ContactNo = res.reservation.contactNo;
        temp.DateOfBooking = res.reservation.dateOfBooking;
        temp.Email = res.reservation.email;
        temp.JourneyDate = res.reservation.journeyDate;
        temp.TicketNo = res.reservation.ticketNo;
        temp.TotalFare = res.reservation.totalFare;
        temp.Status = res.reservation.status;
        temp.PassengerName = res.reservation.passengerName;
        temp.NoOfTickets = res.reservation.noOfTickets;
        this.tickets.push(temp);
      } else {
        window.alert(res.message);
      }
    });
  }
  fillDetails(res: any) {
    res.map((res: any) => {
      var temp = new Ticket();
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
