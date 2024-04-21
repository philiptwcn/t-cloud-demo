import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { routeGuard } from './route-guard.guard';
import { randomUUID } from 'crypto';

const sessionStorageMock = (() => {
  const sessionStorage: { key: string } = { key: randomUUID() };

  return {
    getItem(key: string) {
      return key ?? sessionStorage.key;
    },
    setItem(key: string, value: string) {
      sessionStorage.key = value.toString();
    },
  };
})();

describe('routeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should redirect to login when the user is not logged in', async () => {
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = await TestBed.runInInjectionContext(() =>
      routeGuard(route, state)
    );

    expect(result).toBeInstanceOf(UrlTree);
  });

  it('should allow access when the user is logged in', async () => {
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorageMock,
    });
    const result = await TestBed.runInInjectionContext(() =>
      routeGuard(route, state)
    );

    expect(result).toBe(true);
  });
});
