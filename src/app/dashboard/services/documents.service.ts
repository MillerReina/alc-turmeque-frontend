import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDocument, IDocuments } from '../../interfaces/documents-interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OfficersData } from '../../models/officer.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
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
   * Obtiene todos los documentos raciados
   */
  getAllDocuments(state: string, pg: string, dp: boolean): Observable<IDocument[]> {
    return this.http.get<IDocuments>(`${base_url}/documents/document?state=${state}&pg=${pg}&dp=${dp}`).pipe(
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
