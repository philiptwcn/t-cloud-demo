import type { CanActivateFn } from '@angular/router';
import { environment } from '../../environments/environment';

export const routeGuard: CanActivateFn = () => {
  return sessionStorage.getItem(environment.storageKey) !== null;
};
