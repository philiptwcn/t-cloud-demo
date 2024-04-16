import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { Driver, DriverService } from '@tcloud/api';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, CardModule, ChartModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  drivers: Driver[] = [];
  lineData: any;
  lineOptions: any;
  pieData: any;
  pieOptions: any;

  constructor(private driverService: DriverService) {}
  ngOnInit() {
    this.driverService.getAllDrivers().subscribe((drivers) => {
      this.drivers = drivers;
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.lineData = {
        labels: ['~20', '21-30', '31-40', '41-50', '51~'],
        datasets: [
          {
            label: 'amount',
            data: [
              this.drivers.filter((driver) => driver.age <= 20).length,
              this.drivers.filter(
                (driver) => driver.age > 20 && driver.age <= 30
              ).length,
              this.drivers.filter(
                (driver) => driver.age > 30 && driver.age <= 40
              ).length,
              this.drivers.filter(
                (driver) => driver.age > 40 && driver.age <= 50
              ).length,
              this.drivers.filter((driver) => driver.age > 50).length,
            ],
            fill: false,
            tension: 0.2,
          },
        ],
      };

      this.lineOptions = {
        maintainAspectRatio: false,
        aspectRatio: 3 / 2,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
            position: 'bottom',
            align: 'start',
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            ticks: { stepSize: 1, color: textColorSecondary },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };

      this.pieData = {
        labels: ['Male', 'Female'],
        datasets: [
          {
            data: [
              this.drivers.filter((driver) => driver.gender === 'male').length,
              this.drivers.filter((driver) => driver.gender === 'female')
                .length,
            ],
            backgroundColor: [
              documentStyle.getPropertyValue('--cyan-500'),
              documentStyle.getPropertyValue('--teal-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--cyan-400'),
              documentStyle.getPropertyValue('--teal-400'),
            ],
          },
        ],
      };

      this.pieOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
            position: 'bottom',
          },
        },
      };
    });
  }
  getAllDrivers() {
    this.driverService.getAllDrivers().subscribe((drivers) => {
      this.drivers = drivers;
    });
  }
}
