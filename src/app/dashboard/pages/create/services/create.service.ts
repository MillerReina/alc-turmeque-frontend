import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITypeID, IType } from '../../../../interfaces/type-id.interface';
import { IDepedency, IDependencies } from '../../../../interfaces/dependency-interface';
import { IRole, IRoles } from '../../../../interfaces/role-interface';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CreateService {
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
   * Obtiene la lista de tipos de ID
   */
  getListOfID(): Observable<ITypeID[]> {
    return this.http
      .get<IType>(`${base_url}/users/document_types`, this.getHeaders)
      .pipe(map((res) => res.document_types));
  }

  /**
   * Obtiene la lista de dependencias
   */
  getListOfDependencies(): Observable<IDepedency[]> {
    return this.http
      .get<IDependencies>(`${base_url}/users/dependency`, this.getHeaders)
      .pipe(map((res) => res.dependencies));
  }

  /**
   * Obtiene la lista de roles
   */
  getListOfRoles(): Observable<IRole[]> {
    return this.http.get<IRoles>(`${base_url}/users/roles`, this.getHeaders).pipe(map((res) => res.roles));
  }
}
