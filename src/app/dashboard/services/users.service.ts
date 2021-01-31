import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegisteredUser, IUsers } from '../../interfaces/registered-user.interface';
import { map, tap } from 'rxjs/operators';
import { IRegisteredOfficers, IOfficers } from '../../interfaces/registered-officers.interface';
import { OfficersData } from '../../models/officer.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private pagination: OfficersData;

  constructor(private http: HttpClient) {
    this.pagination = new OfficersData();
  }

  /* Obtiene el token del usuario */
  get getToken(): string {
    return localStorage.getItem('tkn-user') || '';
  }

  /**
   * Obtiene la informacón de paginación
   */

  get getPagination(): OfficersData {
    return this.pagination;
  }
  /**
   * Obtiene la información personal del perfil autenticado
   */
  getMyDetails(): Observable<any> {
    return this.http.get<any>(`${base_url}/users/officer`);
  }
  /**
   * Obtiene todos los usuarios del sistema
   */
  getAllUsers(term: string, pg: string): Observable<IRegisteredUser[]> {
    return this.http.get<IUsers>(`${base_url}/users/user?term=${term}&pg=${pg}`).pipe(
      tap((res) => {
        this.pagination.total_records = res.total_records;
        this.pagination.total_pages = res.total_pages;
        this.pagination.page = res.page;
        this.pagination.has_next = res.has_next;
        this.pagination.has_prev = res.has_prev;
      }),
      map((res) => res.results)
    );
  }
  /**
   * Obtiene todos los funcionarios del sistema
   */
  getAllOfficers(term: string, pg: string, fn: boolean): Observable<IRegisteredOfficers[]> {
    return this.http.get<IOfficers>(`${base_url}/users/officer?term=${term}&fn=${fn}&pg=${pg}`).pipe(
      tap((res) => {
        this.pagination.total_records = res.total_records;
        this.pagination.total_pages = res.total_pages;
        this.pagination.page = res.page;
        this.pagination.has_next = res.has_next;
        this.pagination.has_prev = res.has_prev;
      }),
      map((res) => res.results)
    );
  }

  /**
   * Obtiene el total de usuarios
   */

  /**
   * Obtiene la información de un solo usuario por id
   */
  getDetailUser(id): Observable<IOfficers> {
    return this.http.get<IOfficers>(`${base_url}/users/user?id=${id}`);
  }
  /**
   * Activar usuario
   */
  activateUser(id: string): Observable<IOfficers> {
    return this.http.delete<IOfficers>(`${base_url}/users/officer?id=${id}`);
  }
}
