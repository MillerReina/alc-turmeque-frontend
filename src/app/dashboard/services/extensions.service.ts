import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRequestExtension } from '../../interfaces/request-extension-interface';
import { IExtensionDetail, IExtensions } from '../../interfaces/extension-detail-interface';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ExtensionsService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos las prorrogas del sistema
   */
  getAllExtensions(): Observable<IExtensionDetail[]> {
    return this.http.get<IExtensions>(`${base_url}/documents/extension`).pipe(map((res) => res.extensions));
  }

  /**
   * Genera la solicitud de la prórroga
   */
  generateExtensionToDocument(formData): Observable<any> {
    return this.http.post<IRequestExtension>(`${base_url}/documents/extension`, formData);
  }

  /**
   * Aprueba la solicitud de la prórroga
   */
  approveExtension(id): Observable<any> {
    return this.http.get<any>(`${base_url}/documents/extension/approve/${id}`);
  }

  /**
   * Rechaza la solicitud de la prórroga
   */
  rejectExtension(id, formData): Observable<any> {
    return this.http.post<any>(`${base_url}/documents/extension/reject/${id}`, formData);
  }
}
