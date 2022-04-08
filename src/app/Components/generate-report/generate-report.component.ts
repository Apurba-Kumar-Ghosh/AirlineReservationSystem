import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ReportService } from 'src/app/Services/report.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css'],
})
export class GenerateReportComponent implements OnInit {
  public flightId: string;
  public startDate: Date;
  public endDate: Date;
  public flightIdAmt: DoubleRange;
  public totalRevenue: DoubleRange;
  constructor(private reportService: ReportService) {
    this.totalRevenue = null;
    this.flightIdAmt = null;
  }

  ngOnInit(): void {}

  flightReport(form: NgForm) {
    this.reportService
      .generateReportById(form.value.flightId)
      .subscribe((res) => {
        this.flightIdAmt = res;
      });
  }
  generateAirlineRevenue() {
    this.reportService.generateAirlineReport().subscribe((res) => {
      this.totalRevenue = res;
    });
  }
}
