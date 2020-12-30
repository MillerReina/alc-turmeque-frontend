import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILoginForm } from '../../interfaces/login-form.interface';
import { User } from '../../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Usuario actualmente logueado
   */
  public user: User;

  constructor(private http: HttpClient) {}
  /* Obtiene el token del usuario */
  get getToken(): string {
    return localStorage.getItem('tkn-user') || '';
  }
  /* Obtiene los headers para solicitudes http */
  get getHeaders() {
    return {
      headers: {
        Authorization: `Token ${this.getToken}`,
      },
    };
  }

  get getRole(): string[] {
    return this.user.role;
  }

  /* Inicia sesion */
  login(formData: ILoginForm): Observable<any> {
    return this.http.post<any>(`${base_url}/users/login`, formData).pipe(
      tap((res: any) => {
        this.initStorage(res);
      })
    );
  }

  /* Cierra sesion */
  logout(): void {
    localStorage.removeItem('tkn-user');
  }

  /* Setea en el localstorage los items de token */
  initStorage(res: any): void {
    localStorage.setItem('tkn-user', res.token);
  }

  getMyDetails(): Observable<any> {
    return this.http.get<any>(`${base_url}/users/user`, this.getHeaders);
  }
  /* Valida que el token sea autentico */
  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/users/user`, this.getHeaders).pipe(
      tap((res: any) => {
        const {
          dependency,
          id = '',
          first_name,
          last_name,
          type_identification,
          identification,
          username,
          email,
          phone_number,
          birthdate,
          type_identification_name,
          dependency_name,
          roles,
        } = res.user;
        this.user = new User(
          dependency,
          id,
          first_name,
          last_name,
          type_identification,
          identification,
          username,
          email,
          phone_number,
          birthdate,
          type_identification_name,
          dependency_name,
          roles
        );
      }),
      map((__) => true),
      catchError((__) => of(false))
    );
  }
  /**
   * Recupera contraseña
   */
  recoverPassword(formData): Observable<any> {
    return this.http.post<any>(`${base_url}/users/restore`, formData);
  }
}
