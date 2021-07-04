import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AccountDTO, AccountModel } from '../models/account.model';
import { AUTH_API } from '../constants/auth.constant';
import { AuthModel } from '../models/auth.model';
import { API_URL } from '../constants/app.constant';
import { PromiseUtil } from '../../shared/utils/promise.util';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  account: AccountModel | null = null;
  accountSubject: BehaviorSubject<AccountModel | null> = new BehaviorSubject<AccountModel | null>(null);

  authInfo: AuthModel | null = null;
  authSubject: BehaviorSubject<AuthModel | null> = new BehaviorSubject<AuthModel | null>(null);

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    this.retrieveAuthInfo();
  }

  async logout(): Promise<boolean> {
    return this.httpClient
      .post(`${API_URL}${AUTH_API.LOGOUT}`, {})
      .pipe(
        map(() => {
          this.updateAuthInfo(null);
          this.updateAccount();
          return true;
        }),
        catchError(error => throwError(error))
      )
      .toPromise();
  }

  updateAuthInfo(authModel: AuthModel | null, rememberMe?: boolean) {
    this.authInfo = authModel;
    this.authSubject.next(this.authInfo);
    if (this.authInfo) {
      this.storeAuthInfo(rememberMe);
    } else {
      this.clearAuthInfo();
    }
  }

  updateAccount(account: AccountModel | null = null) {
    this.account = account;
    this.accountSubject.next(this.account);
  }

  getAuthInfo(): AuthModel | null {
    return this.authInfo;
  }

  fetch(): Promise<AccountModel> {
    return this.httpClient
      .get<AccountDTO>(`${API_URL}/auth/me`)
      .pipe(
        take(1),
        map(response => new AccountModel(response))
      )
      .toPromise();
  }

  private retrieveAuthInfo() {
    const savedAccessToken = this.cookieService.get('Auth-token');
    if (savedAccessToken) {
      this.updateAuthInfo(new AuthModel({ access_token: savedAccessToken }));
    }
  }

  private storeAuthInfo(rememberMe?: boolean): void {
    this.cookieService.set('Auth-token', this.authInfo?.accessToken as string, rememberMe ? { expires: this.authInfo?.expiredTime } : {});
  }

  private clearAuthInfo(): void {
    this.cookieService.delete('Auth-token');
  }

  async getCurrentAccount(force: boolean = false): Promise<AccountModel | null> {
    if (force || !this.account) {
      const [response] = await PromiseUtil.handle(this.fetch());
      this.account = response;
      this.accountSubject.next(this.account);
    }

    return this.account;
  }
}
