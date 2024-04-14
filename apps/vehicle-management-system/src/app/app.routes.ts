import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];
