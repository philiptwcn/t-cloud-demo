import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverComponent } from './driver.component';
import { importProvidersFrom } from '@angular/core';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

describe('DriverComponent', () => {
  let component: DriverComponent;
  let fixture: ComponentFixture<DriverComponent>;

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
      ],
    };
    await TestBed.configureTestingModule({
      imports: [DriverComponent],
      providers: [importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig))],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
