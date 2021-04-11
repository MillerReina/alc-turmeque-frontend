import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IExternal } from '../../../../../interfaces/external-document-interface';
import { ExternalDocumentsService } from '../../../../services/external-documents.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-external-table',
  templateUrl: './external-table.component.html',
  styleUrls: ['./external-table.component.scss'],
})
export class ExternalTableComponent implements OnInit {
  /**
   * Tipo de documento que se va a cargar
   */
  @Input() documentType: string;
  /**
   * Precarga de los componentes
   */
  public preload: boolean;
  /**
   * Estado de carga para busqueda
   */
  public preloadSearch: boolean;
  /**
   * Columnas
   */
  public displayedColumns: string[] = ['numero', 'estado', 'fecha', 'fecha_fin', 'dependencia', 'tipo', 'usuario'];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IExternal>;
  /**
   * Documentos
   */
  public documentsFiled: IExternal[];
  /**
   * Tamaño maximo
   */
  public pageSize: number;
  /**
   * Número de la pagina
   */
  public pageNumber: number;
  /**
   * Cantidad total de registros
   */
  public totalData: number;
  /**
   * Paginador
   */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private externalDocumentService: ExternalDocumentsService, private router: Router) {
    this.preload = true;
    this.pageSize = 10;
    this.pageNumber = 1;
  }

  ngOnInit(): void {
    this.loadExternalDocuments();
  }

  /**
   * Carga las solicitudes externas
   */
  loadExternalDocuments(): void {
    this.externalDocumentService
      .getAllDocuments(this.documentType, this.pageNumber.toString(), true, '')
      .subscribe((res) => {
        this.documentsFiled = res;
        this.totalData = this.externalDocumentService.getPagination.total_records;
        this.refreshTable();
      });
  }

  /**
   * Refresca la tabla con los documentos
   */
  refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.documentsFiled);
    this.dataSource.paginator = this.paginator;
    this.preload = false;
    this.preloadSearch = false;
  }

  /**
   * Abre documento en especifico por id
   */
  getDocument(element): void {
    this.router.navigate([`/dashboard/detail/${element.id}/external`]);
  }

  /**
   * Busca documento por coincidencia
   */
  searchDocumentsByCoincidence(term): void {
    this.preloadSearch = true;
    this.externalDocumentService
      .getAllDocuments(this.documentType, this.pageNumber.toString(), true, term)
      .subscribe((res) => {
        this.documentsFiled = res;
        this.totalData = this.externalDocumentService.getPagination.total_records;
        this.refreshTable();
      });
  }

  /**
   * Paginador
   * @param e Accion de atras o siguente
   */
  handlePage(e: PageEvent): void {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    const inputValue = (document.getElementById('term') as HTMLInputElement).value;
    if (inputValue) {
      this.searchDocumentsByCoincidence(inputValue);
    } else {
      this.loadExternalDocuments();
    }
  }
}
