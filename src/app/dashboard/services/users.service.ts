import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegisteredUser, IUsers } from '../../interfaces/registered-user.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { IRegisteredOfficers, IOfficers } from '../../interfaces/registered-officers.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
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

  /**
   * Obtiene la información personal del perfil autenticado
   */
  getMyDetails(): Observable<any> {
    return this.http.get<any>(`${base_url}/users/user`, this.getHeaders);
  }
  /**
   * Obtiene todos los usuarios del sistema
   */
  getAllUsers(term: string, pg: string): Observable<IRegisteredUser[]> {
    return this.http
      .get<IUsers>(`${base_url}/users/user?term=${term}&pg=${pg}`, this.getHeaders)
      .pipe(map((res) => res.results));
  }
  /**
   * Obtiene todos los usuarios del sistema
   */
  getAllOfficers(term: string, pg: string, fn: boolean): Observable<IRegisteredOfficers[]> {
    return this.http
      .get<IOfficers>(`${base_url}/users/user?term=${term}&fn=${fn}&pg=${pg}`, this.getHeaders)
      .pipe(map((res) => res.results));
  }
  /**
   * Activar usuario
   */
  activateUser(id: string): Observable<IOfficers> {
    return this.http.delete<IOfficers>(`${base_url}/users/officer?id=${id}`, this.getHeaders);
  }
}
