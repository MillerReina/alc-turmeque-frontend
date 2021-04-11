import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IExternal, IExternalDocuments } from '../../interfaces/external-document-interface';
import { map, tap } from 'rxjs/operators';
import { OfficersData } from '../../models/officer.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ExternalDocumentsService {
  /**
   * Paginacion desde el servicio
   */
  private pagination: OfficersData;

  constructor(private http: HttpClient) {
    this.pagination = new OfficersData();
  }

  /**
   * Obtiene la informacón de paginación
   */
  get getPagination(): OfficersData {
    return this.pagination;
  }

  /**
   * Obtiene todos las solicitudes externas del sistema
   */
  getAllDocuments(state: string, pg: string, dp: boolean, term: string): Observable<IExternal[]> {
    return this.http
      .get<IExternalDocuments>(`${base_url}/documents/doc_external?state=${state}&pg=${pg}&dp=${dp}&term=${term}`)
      .pipe(
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
}
