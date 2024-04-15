import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { routeGuard } from './guard/route-guard.guard';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [routeGuard],
    component: LayoutComponent,
    // children: [
    //   { path: 'childpath', component: ChildComponent }
    // ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];
