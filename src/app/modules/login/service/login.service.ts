import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthDTO, AuthModel } from '../../../core/models/auth.model';
import { API_URL } from '../../../core/constants/app.constant';
import { AUTH_API } from '../../../core/constants/auth.constant';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { throwError } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  login(credentials: { username: string; password: string; rememberMe: boolean }): Promise<boolean> {
    return this.httpClient
      .post<AuthDTO>(`${API_URL}${AUTH_API.AUTH}`, credentials)
      .pipe(
        take(1),
        map(response => {
          this.authService.updateAuthInfo(new AuthModel(response), credentials.rememberMe);
          return true;
        }),
        catchError(error => throwError(error))
      )
      .toPromise();
  }
}
