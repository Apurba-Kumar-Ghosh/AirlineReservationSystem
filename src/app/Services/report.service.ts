import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const reportUrl =
  'http://airlinesprint.azurewebsites.net/api/Reservations/GenerateFlightRevenue';
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  generateReportById(flightId: string): Observable<DoubleRange> {
    return this.http.get(reportUrl, {
      params: {
        FlightID: flightId,
      },
    });
  }
  generateAirlineReportByDate(
    startDate: Date,
    endDate: Date
  ): Observable<DoubleRange> {
    return this.http.get(reportUrl, {
      params: {
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
      },
    });
  }
  generateAirlineReport(): Observable<DoubleRange> {
    return this.http.get(reportUrl + '/RevenueCGAirLine');
  }
}
