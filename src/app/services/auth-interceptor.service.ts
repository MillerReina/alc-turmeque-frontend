import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
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
    const re = '/tracking';

    if (req.url.search(re) === -1) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${this.getToken}`,
        },
      });
    }

    return next.handle(req);
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
