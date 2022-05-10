import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const reportUrl = 'http://cg-ars.azurewebsites.net/reservations/';
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  public headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  generateReportById(flightId: string): Observable<any> {
    return this.http.get(reportUrl + '/get-revenue-by-flight', {
      headers: this.headers.append(
        'authorization',
        sessionStorage.getItem('token')
      ),
      params: {
        FlightID: flightId,
      },
    });
  }
  generateAirlineReportByDate(startDate: Date, endDate: Date): Observable<any> {
    return this.http.get(reportUrl, {
      headers: this.headers.append(
        'authorization',
        sessionStorage.getItem('token')
      ),
      params: {
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
      },
    });
  }
  generateAirlineReport(): Observable<any> {
    return this.http.get(reportUrl + 'total-revenue', {
      headers: this.headers.append(
        'authorization',
        sessionStorage.getItem('token')
      ),
    });
  }
}
