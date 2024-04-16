import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { routeGuard } from './guard/route-guard.guard';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [routeGuard],
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        canActivateChild: [routeGuard],
        children: [
          {
            path: 'driver',
            loadComponent: () =>
              import('./driver/driver.component').then(
                (m) => m.DriverComponent
              ),
          },
          {
            path: 'vehicle',
            loadComponent: () =>
              import('./vehicle/vehicle.component').then(
                (m) => m.VehicleComponent
              ),
          },
          {
            path: 'report',
            loadComponent: () =>
              import('./report/report.component').then(
                (m) => m.ReportComponent
              ),
          },
          { path: '', redirectTo: 'driver', pathMatch: 'full' },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
