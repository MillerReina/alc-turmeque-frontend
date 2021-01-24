import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  /* Obtiene el token del usuario */
  get getToken(): string {
    return localStorage.getItem('tkn-user') || '';
  }
  /**
   * Interceptor de auth
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      Authorization: `Token ${this.getToken}`,
    });

    const reqClone = req.clone({
      headers,
    });
    return next.handle(reqClone);
  }

  /**
   * Manejador de error personalizado
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    /* this.logout(); */
    console.warn(error);
    return throwError('Invalid Token');
  }

  /* Cierra sesion */
  logout(): void {
    localStorage.removeItem('tkn-user');
  }
}
