import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Driver } from '../models/driver';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  storeName = 'drivers';

  constructor(private dbService: NgxIndexedDBService) {}

  getAllDrivers() {
    return this.dbService.getAll<Driver>(this.storeName);
  }

  getDriverById(id: string) {
    return this.dbService.getByID(this.storeName, id);
  }

  createDriver(driver: Driver) {
    return this.dbService.add(this.storeName, driver).pipe(
      tap((key) => {
        console.log('key: ', key);
      })
    );
  }

  deleteDriver(driver: Driver) {
    return this.dbService.deleteByKey(this.storeName, driver.id).pipe(
      tap((value) => {
        console.log(value);
      })
    );
  }
}
