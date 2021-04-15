import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getMyDocumentsReport(month, dependency, year, type): Observable<any> {
    return this.http.get<any>(
      `${base_url}/reports/documents?month=${month}&dependency=${dependency}&year=${year}&type=${type}`
    );
  }
}
