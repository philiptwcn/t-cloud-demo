import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  const storageKey = 'accessToken';
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should set random id in sessionStorage after logged in', () => {
    service.login(storageKey, 'admin', 'admin');
    expect(sessionStorage.getItem(storageKey)).toBeTruthy();
  });

  it('should remove random id in sessionStorage after logged out', () => {
    service.logout(storageKey);
    expect(sessionStorage.getItem(storageKey)).toBeFalsy();
  });
});
