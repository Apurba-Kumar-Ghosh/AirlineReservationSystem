import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const reportUrl = 'http://cg-ars.azurewebsites.net/reservations/';
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  generateReportById(flightId: string): Observable<any> {
    return this.http.get(reportUrl + '/get-revenue-by-flight', {
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
  generateAirlineReport(): Observable<any> {
    return this.http.get(reportUrl + 'total-revenue');
  }
}
