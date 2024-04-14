import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Login with params and save random UUID in session storage
   *
   * @param {string} account
   * @param {string} password
   * @return {*}  {boolean}
   * @memberof AuthService
   */
  login(account: string, password: string): boolean {
    const isLoginSuccess = account === 'admin' && password === 'admin';
    if (isLoginSuccess) {
      sessionStorage.setItem(environment.storageKey, crypto.randomUUID());
    }

    return isLoginSuccess;
  }

  /**
   * Logout and clear UUID in session storage
   *
   * @return {*}  {boolean}
   * @memberof AuthService
   */
  logout(): boolean {
    sessionStorage.removeItem(environment.storageKey);
    return true;
  }
}
