import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleComponent } from './vehicle.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { importProvidersFrom } from '@angular/core';

describe('VehicleComponent', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;

  beforeEach(async () => {
    const dbConfig: DBConfig = {
      name: 'tcloud',
      version: 1,
      objectStoresMeta: [
        {
          store: 'drivers',
          storeConfig: { keyPath: 'id', autoIncrement: false },
          storeSchema: [
            { name: 'name', keypath: 'name', options: { unique: false } },
            {
              name: 'userName',
              keypath: 'userName',
              options: { unique: true },
            },
          ],
        },
        {
          store: 'vehicles',
          storeConfig: { keyPath: 'id', autoIncrement: false },
          storeSchema: [
            { name: 'name', keypath: 'name', options: { unique: false } },
          ],
        },
      ],
    };
    await TestBed.configureTestingModule({
      imports: [VehicleComponent],
      providers: [importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig))],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
