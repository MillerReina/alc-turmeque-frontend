import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PerformanceDependencies } from '../../../../models/performance-report-model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  /**
   * Variable para el reporte de eficiencia
   */
  public performanceReport: PerformanceDependencies[] = [];
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los documentos por parámetro
   */
  getMyDocumentsReport(month, dependency, year, type): Observable<any> {
    return this.http.get<any>(
      `${base_url}/reports/documents?month=${month}&dependency=${dependency}&year=${year}&type=${type}`
    );
  }

  /**
   *  Obtiene el reporte de rendimiento de un funcionario
   */
  getOfficersReport(month, dependency, year) {
    return this.http.get<any>(`${base_url}/reports/user?month=${month}&dependency=${dependency}&year=${year}`);
  }

  /**
   *  Obtiene el reporte de rendimiento por dependencias
   */
  getDependenciesPercent(month, dependency, year) {
    const aux = [];
    this.performanceReport = aux;
    return this.http.get<any>(`${base_url}/reports/solved?month=${month}&dependency=${dependency}&year=${year}`).pipe(
      tap((res) => {
        res.forEach((element) => {
          this.performanceReport.push(
            new PerformanceDependencies(element.name_dependency, element.solved.yes, element.solved.no)
          );
        });
      })
    );
  }
}
