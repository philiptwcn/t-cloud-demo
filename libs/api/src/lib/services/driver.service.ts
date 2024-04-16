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

  getAllDriver() {
    return this.dbService.getAll<Driver>(this.storeName).pipe(
      tap((drivers) => {
        console.log(drivers);
      })
    );
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
