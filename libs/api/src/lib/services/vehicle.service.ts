import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Vehicle } from '../models/vehicle';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  storeName = 'vehicles';

  constructor(private dbService: NgxIndexedDBService) {}

  getAllVehicles() {
    return this.dbService.getAll<Vehicle>(this.storeName);
  }

  createVehicle(vehicle: Vehicle) {
    return this.dbService.add(this.storeName, vehicle).pipe(
      tap((key) => {
        console.log('key: ', key);
      })
    );
  }

  deleteVehicle(vehicle: Vehicle) {
    return this.dbService.deleteByKey(this.storeName, vehicle.id).pipe(
      tap((value) => {
        console.log(value);
      })
    );
  }
}
