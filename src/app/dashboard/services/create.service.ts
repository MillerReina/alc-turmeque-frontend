import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITypeID, IType } from '../../interfaces/type-id.interface';
import { IDepedency, IDependencies } from '../../interfaces/dependency-interface';
import { IRole, IRoles } from '../../interfaces/role-interface';
import { IOfficer } from '../../interfaces/registered-officers.interface';
import { IUserInfoById } from '../../interfaces/info-user.interface';
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

  /**
   * Obtiene la lista de tipos de ID
   */
  getListOfID(): Observable<ITypeID[]> {
    return this.http.get<IType>(`${base_url}/users/document_types`).pipe(map((res) => res.document_types));
  }

  /**
   * Obtiene la lista de dependencias
   */
  getListOfDependencies(): Observable<IDepedency[]> {
    return this.http.get<IDependencies>(`${base_url}/users/dependency`).pipe(map((res) => res.dependencies));
  }

  /**
   * Obtiene la lista de roles
   */
  getListOfRoles(): Observable<IRole[]> {
    return this.http.get<IRoles>(`${base_url}/users/roles`).pipe(map((res) => res.roles));
  }

  /**
   * Crea la cuenta de un funcionario
   */
  createOfficer(formData: IOfficer): Observable<IOfficer> {
    return this.http.post<IOfficer>(`${base_url}/users/officer`, formData);
  }
  /**
   * Crea la cuenta de un beneficiario
   */
  createUser(formData: IOfficer): Observable<IOfficer> {
    return this.http.post<IOfficer>(`${base_url}/users/user`, formData);
  }
  /**
   * Trae la información de un usuario por id
   */
  getUserById(id: string): Observable<IUserInfoById> {
    return this.http.get<IUserInfoById>(`${base_url}/users/user?id=${id}`);
  }

  updateUserById(formData): Observable<IOfficer> {
    return this.http.put<IOfficer>(`${base_url}/users/user`, formData);
  }

  updateOfficerById(formData): Observable<IOfficer> {
    return this.http.put<IOfficer>(`${base_url}/users/officer`, formData);
  }
}
