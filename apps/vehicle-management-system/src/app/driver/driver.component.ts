import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Driver, DriverService } from '@tcloud/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { finalize, tap } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-driver',
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
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss',
})
export class DriverComponent implements OnInit {
  drivers: Driver[] = [];
  visible = false;
  createDriverForm = this._formBuilder.group({
    userName: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    gender: new FormControl('', Validators.required),
  });
  constructor(
    private _formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private driverService: DriverService
  ) {}
  ngOnInit(): void {
    this.getAllDrivers();
  }
  showDialog() {
    this.visible = true;
  }

  dismissDialog() {
    this.visible = false;
  }

  getAllDrivers() {
    this.driverService.getAllDriver().subscribe((drivers) => {
      console.log(drivers);
      this.drivers = drivers;
    });
  }

  createDriver() {
    if (this.createDriverForm.valid) {
      this.driverService
        .createDriver({
          id: crypto.randomUUID(),
          userName: this.createDriverForm.controls.userName.value ?? '',
          name: this.createDriverForm.controls.name.value ?? '',
          age: this.createDriverForm.controls.age.value ?? 0,
          gender: this.createDriverForm.controls.gender.value ?? '',
        })
        .pipe(
          tap({
            next: () =>
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Create driver success.',
                life: 3000,
              }),
            error: () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'Create driver failed.',
                life: 3000,
              }),
          }),
          finalize(() => {
            this.visible = false;
            this.getAllDrivers();
          })
        )
        .subscribe();
    }
  }

  deleteDriver(driver: Driver) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + driver.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.driverService
          .deleteDriver(driver)
          .pipe(
            tap({
              next: () =>
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Success',
                  detail: 'Delete driver success.',
                  life: 3000,
                }),
              error: () =>
                this.messageService.add({
                  severity: 'error',
                  summary: 'Failed',
                  detail: 'Delete driver failed.',
                  life: 3000,
                }),
            }),
            finalize(() => {
              this.getAllDrivers();
            })
          )
          .subscribe();
      },
    });
  }

  filter(driverTable: any, event: any) {
    driverTable.filterGlobal(event.target.value, 'contains');
  }
}
