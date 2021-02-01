import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IDepedency, IDependencies } from '../../interfaces/dependency-interface';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DepenciesService {
  constructor(private http: HttpClient) {}

  /* Obtiene el token del usuario */
  get getToken(): string {
    return localStorage.getItem('tkn-user') || '';
  }

  /**
   * Obtiene todos las dependencias del sistema
   */
  getAllDependecies(): Observable<IDepedency[]> {
    return this.http.get<IDependencies>(`${base_url}/users/dependency`).pipe(map((res) => res.dependencies));
  }

  /**
   * Crea una dependencia
   */
  createDependency(formData): Observable<IDepedency> {
    return this.http.post<IDepedency>(`${base_url}/users/dependency`, formData);
  }
  /**
   * Edita una dependencia
   */
  updateDependencyById(formData): Observable<IDepedency> {
    return this.http.put<IDepedency>(`${base_url}/users/dependency`, formData);
  }

  /**
   * Obtiene todos las dependencias del sistema
   */
  deleteDependencyById(id): Observable<IDepedency> {
    return this.http.delete<IDepedency>(`${base_url}/users/dependency?id=${id}`);
  }
  /**
   * Activar dependencia
   */
  activateDependency(id: string): Observable<IDepedency> {
    return this.http.delete<IDepedency>(`${base_url}/users/dependency?id=${id}&state=true`);
  }
}
