import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDocument, IDocuments } from '../../interfaces/documents-interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OfficersData } from '../../models/officer.model';
import { IDocumentDetail } from 'src/app/interfaces/document-detail-interface';
import { IAssignUser } from '../../interfaces/assign-user-interface';

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
  getAllDocuments(state: string, pg: string, dp: boolean, term: string): Observable<IDocument[]> {
    return this.http
      .get<IDocuments>(`${base_url}/documents/document?state=${state}&pg=${pg}&dp=${dp}&term=${term}`)
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

  /**
   * Radica nuevo documento en el sistema
   */
  createDocument(formData): Observable<any> {
    return this.http.post<any>(`${base_url}/documents/document`, formData);
  }

  /**
   * Obtiene la información de un documento por id
   */
  getDetailDocument(id): Observable<IDocumentDetail> {
    return this.http.get<IDocumentDetail>(`${base_url}/documents/document?id=${id}`);
  }

  /**
   * Obtiene los funcionarios disponibles para asignar
   */
  getOfficersToAssign(): Observable<IAssignUser[]> {
    return this.http.get<IAssignUser[]>(`${base_url}/users/officer_form`);
  }

  /**
   * Asigna del documento a un funcionario
   */
  assignOfficerToDocument(formData): Observable<any> {
    return this.http.post<any>(`${base_url}/documents/assign`, formData);
  }

  /**
   * Devuelve el documento a una dependencia
   */
  returnDocument(formData): Observable<any> {
    console.log(formData);

    return this.http.post<any>(`${base_url}/documents/reassign`, formData);
  }
}
