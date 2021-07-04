import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.getAuthInfo()?.accessToken !== null) {
      const clonedReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getAuthInfo()?.accessToken),
      });
      return next.handle(clonedReq);
    }

    return next.handle(request);
  }
}
