import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITracking } from '../interfaces/tracking-interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la información del documento para el usuario
   */
  getHistoric(id): Observable<ITracking> {
    console.log();

    return this.http.get<ITracking>(`${base_url}/documents/tracking/${id}`);
  }
}
