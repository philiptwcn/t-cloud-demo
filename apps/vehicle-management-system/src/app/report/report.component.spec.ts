import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportComponent } from './report.component';
import { importProvidersFrom } from '@angular/core';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

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
      imports: [ReportComponent],
      providers: [importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig))],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
