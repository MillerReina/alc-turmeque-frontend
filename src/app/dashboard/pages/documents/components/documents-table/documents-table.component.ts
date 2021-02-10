import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IDocument } from '../../../../../interfaces/documents-interface';
import { DocumentsService } from '../../../../services/documents.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.scss'],
})
export class DocumentsTableComponent implements OnInit {
  /**
   * Tipo de documento que se va a cargar
   */
  @Input() documentType: string;
  /**
   * Estado de carga
   */
  public preload: boolean;
  /**
   * Estado de carga para busqueda
   */
  public preloadSearch: boolean;
  /**
   * Columnas de la tabla
   */
  public displayedColumns: string[] = [
    'radicado',
    'estado',
    'fecha_registro',
    'remitente',
    'dependencia',
    'tipo_documento',
    'asignado_a',
  ];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IDocument>;
  /**
   * Documentos
   */
  public documentsFiled: IDocument[];
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

  constructor(private documentService: DocumentsService) {
    this.preload = true;
    this.pageSize = 10;
    this.pageNumber = 1;
  }

  ngOnInit(): void {
    this.loadDocuments();
  }

  get inputTerm(): string {
    return (document.getElementById('term') as HTMLInputElement).value;
  }

  loadDocuments(): void {
    this.preloadSearch = true;
    this.documentService.getAllDocuments(this.documentType, this.pageNumber.toString(), true).subscribe((res) => {
      this.documentsFiled = res;
      this.totalData = this.documentService.getPagination.total_records;
      this.refreshTable();
    });
  }

  refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.documentsFiled);
    this.dataSource.paginator = this.paginator;
    this.preload = false;
    this.preloadSearch = false;
  }

  searchDocumentsByCoincidence(): void {
    this.preloadSearch = true;
    this.documentService.getAllDocuments(this.documentType, this.pageNumber.toString(), true).subscribe((res) => {
      this.documentsFiled = res;
      this.totalData = this.documentService.getPagination.total_records;
      this.refreshTable();
    });
  }

  handlePage(e: PageEvent): void {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    const inputValue = (document.getElementById('term') as HTMLInputElement).value;
    if (inputValue) {
      this.searchDocumentsByCoincidence();
    } else {
      this.loadDocuments();
    }
  }

  getDocument(element): void {
    console.log(element);
  }
}
