import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  /**
   * Login with params and save random UUID in session storage
   *
   * @param {string} storageKey
   * @param {string} account
   * @param {string} password
   * @return {*}  {boolean}
   * @memberof AuthenticationService
   */
  login(storageKey: string, account: string, password: string): boolean {
    const isLoginSuccess = account === 'admin' && password === 'admin';
    if (isLoginSuccess) {
      sessionStorage.setItem(storageKey, crypto.randomUUID());
    }

    return isLoginSuccess;
  }

  /**
   * Logout and clear UUID in session storage
   *
   * @param {string} storageKey
   * @return {*}  {boolean}
   * @memberof AuthenticationService
   */
  logout(storageKey: string): boolean {
    sessionStorage.removeItem(storageKey);
    return true;
  }
}
