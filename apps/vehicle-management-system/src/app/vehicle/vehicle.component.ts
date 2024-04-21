import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Driver, DriverService, Vehicle, VehicleService } from '@tcloud/api';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { tap, finalize, switchMap, map } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    MessagesModule,
    ConfirmDialogModule,
    DropdownModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
})
export class VehicleComponent implements OnInit {
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  visible = false;
  createVehicleForm = this._formBuilder.group({
    name: new FormControl('', Validators.required),
    driver: new FormControl('', Validators.required),
  });
  constructor(
    private _formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private driverService: DriverService,
    private vehicleService: VehicleService
  ) {}
  ngOnInit(): void {
    this.getAllDrivers();
    this.getAllVehicles();
  }
  showDialog(): void {
    this.visible = true;
  }

  dismissDialog(): void {
    this.visible = false;
  }
  getAllDrivers(): void {
    this.driverService.getAllDrivers().subscribe((drivers) => {
      this.drivers = drivers;
    });
  }

  getAllVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles.map((vehicle) => {
        vehicle.driver =
          this.drivers.find((driver) => driver.id === vehicle.driver)?.name ??
          vehicle.driver;

        return vehicle;
      });
    });
  }

  createVehicle(): void {
    if (this.createVehicleForm.valid) {
      this.vehicleService
        .createVehicle({
          id: crypto.randomUUID(),
          name: this.createVehicleForm.controls.name.value ?? '',
          driver: this.createVehicleForm.controls.driver.value ?? '',
        })
        .pipe(
          tap({
            next: () =>
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Create vehicle success.',
                life: 3000,
              }),
            error: () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'Create vehicle failed.',
                life: 3000,
              }),
          }),
          finalize(() => {
            this.visible = false;
            this.getAllVehicles();
          })
        )
        .subscribe();
    }
  }

  deleteVehicle(vehicle: Vehicle): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + vehicle.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.vehicleService
          .deleteVehicle(vehicle)
          .pipe(
            tap({
              next: () =>
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Success',
                  detail: 'Delete vehicle success.',
                  life: 3000,
                }),
              error: () =>
                this.messageService.add({
                  severity: 'error',
                  summary: 'Failed',
                  detail: 'Delete vehicle failed.',
                  life: 3000,
                }),
            }),
            finalize(() => {
              this.getAllVehicles();
            })
          )
          .subscribe();
      },
    });
  }

  filter(vehicleTable: any, event: any): void {
    vehicleTable.filterGlobal(event.target.value, 'contains');
  }
}
