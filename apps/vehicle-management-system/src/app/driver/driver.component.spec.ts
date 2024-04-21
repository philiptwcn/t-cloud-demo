import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverComponent } from './driver.component';
import { importProvidersFrom } from '@angular/core';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { environment } from '../../environments/environment.development';

describe('DriverComponent', () => {
  let component: DriverComponent;
  let fixture: ComponentFixture<DriverComponent>;

  beforeEach(async () => {
    const dbConfig: DBConfig = environment.dbConfig;
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
