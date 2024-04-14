import type { CanActivateFn } from '@angular/router';
import { environment } from '../../environments/environment';

export const routeGuardGuard: CanActivateFn = (route, state) => {
  return sessionStorage.getItem(environment.storageKey) !== null;
};
