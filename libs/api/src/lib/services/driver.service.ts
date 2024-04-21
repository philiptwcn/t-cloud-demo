import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Driver } from '../models/driver';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  storeName = 'drivers';

  constructor(private dbService: NgxIndexedDBService) {}

  getAllDrivers(): Observable<Driver[]> {
    return this.dbService.getAll<Driver>(this.storeName);
  }

  getDriverById(id: string): Observable<Driver> {
    return this.dbService.getByID<Driver>(this.storeName, id);
  }

  createDriver(driver: Driver): Observable<Driver> {
    return this.dbService.add(this.storeName, driver).pipe(
      tap((key) => {
        console.log('key: ', key);
      })
    );
  }

  deleteDriver(driver: Driver): Observable<boolean> {
    return this.dbService.deleteByKey(this.storeName, driver.id).pipe(
      tap((value) => {
        console.log(value);
      })
    );
  }
}
