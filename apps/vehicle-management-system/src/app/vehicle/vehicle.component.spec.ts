import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleComponent } from './vehicle.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../../environments/environment.development';

describe('VehicleComponent', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;

  beforeEach(async () => {
    const dbConfig: DBConfig = environment.dbConfig;
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
