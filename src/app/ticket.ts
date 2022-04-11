export class Ticket {
  public TicketNo: number;
  public FlightId: string;
  public DateOfBooking: Date;
  public PassengerName: string;
  public ContactNo: number;
  public Email: string;
  public JourneyDate: Date;
  public NoOfTickets: number;
  public TotalFare: number;
  public Status: StatusType;
}
type StatusType = 'Booked' | 'Cancelled';
