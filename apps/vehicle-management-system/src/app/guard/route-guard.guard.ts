import { Router, type CanActivateFn } from '@angular/router';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';

export const routeGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (sessionStorage.getItem(environment.storageKey) !== null) {
    return true;
  }

  return router.parseUrl('/login');
};
