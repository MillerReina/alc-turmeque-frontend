import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ExtensionsService {
  constructor(private http: HttpClient) {}

  /**
   * Genera la solicitud de la prórroga
   */
  generateExtensionToDocument(formData): Observable<any> {
    return this.http.post<any>(`${base_url}/documents/extension`, formData);
  }
}
