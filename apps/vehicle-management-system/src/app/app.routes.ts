import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { routeGuard } from './guard/route-guard.guard';
import { DriverComponent } from './driver/driver.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [routeGuard],
    component: LayoutComponent,
    children: [{ path: 'driver', component: DriverComponent }],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];
