import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportComponent } from './report.component';
import { importProvidersFrom } from '@angular/core';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { environment } from '../../environments/environment.development';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async () => {
    const dbConfig: DBConfig = environment.dbConfig;
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
