import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDocType, IDocTypes } from '../../interfaces/doc-type-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DocTypeService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los tipos de documento del sistema
   */
  getAllDocTypes(): Observable<IDocType[]> {
    return this.http.get<IDocTypes>(`${base_url}/documents/type`).pipe(map((res) => res.documentTypes));
  }

  /**
   * Crea un tipo de documento
   */
  createDocType(formData): Observable<IDocType> {
    return this.http.post<IDocType>(`${base_url}/documents/type`, formData);
  }
  /**
   * Edita un tipo de documento
   */
  updateDocTypeById(formData): Observable<IDocType> {
    return this.http.put<IDocType>(`${base_url}/documents/type`, formData);
  }

  /**
   * Borrar un tipo de documento
   */
  deleteDocTypeById(id): Observable<IDocType> {
    return this.http.delete<IDocType>(`${base_url}/documents/type?id=${id}`);
  }
  /**
   * Activar/desactivar tipo de documento
   */
  activateDocType(id: string): Observable<IDocType> {
    return this.http.delete<IDocType>(`${base_url}/documents/type?id=${id}&state=true`);
  }
}
