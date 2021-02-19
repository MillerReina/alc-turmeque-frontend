import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IDocument } from '../../../../../interfaces/documents-interface';
import { DocumentsService } from '../../../../services/documents.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AssingDocumentDialogComponent } from '../assing-document-dialog/assing-document-dialog.component';
import { Subscription } from 'rxjs';
import { AssignUserDialogService } from '../../../../services/assign-user-dialog.service';
import { ToastMessageService } from '../../../../../services/toast-message.service';
import { INewAssign } from '../../../../../interfaces/assign-user-interface';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.scss'],
})
export class DocumentsTableComponent implements OnInit, OnDestroy {
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
   * Es titular
   */
  public isMain: boolean;
  /**
   * Subscripcion hacia el evento del dialog
   */
  public newAssignSubscrition: Subscription;
  /**
   * Paginador
   */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public assignUserDialogService: AssignUserDialogService,
    private toastService: ToastMessageService
  ) {
    this.preload = true;
    this.pageSize = 10;
    this.pageNumber = 1;
  }

  ngOnInit(): void {
    this.isMainAccount();
    this.loadDocuments();
    this.valueChanges();
  }

  ngOnDestroy(): void {
    this.newAssignSubscrition.unsubscribe();
  }
  get inputTerm(): string {
    return (document.getElementById('term') as HTMLInputElement).value;
  }

  /**
   * Detecta si es un titular
   */
  isMainAccount(): void {
    this.isMain = this.authService.isMainConfirmation;
  }

  valueChanges(): void {
    this.newAssignSubscrition = this.assignUserDialogService.newAssign.subscribe((res: INewAssign) => {
      this.preload = true;
      this.toastService.showSuccessMessageDocuments(
        'RADICADO ASIGNADO',
        `El funcionario: ${res.user_name.toUpperCase()} de la dependencia: ${res.name_dependency.toUpperCase()} tiene un nuevo radicado.`
      );
      this.loadDocuments();
    });
  }

  /**
   * Carga los documentos del sistema
   */
  loadDocuments(): void {
    this.preloadSearch = true;
    this.documentService.getAllDocuments(this.documentType, this.pageNumber.toString(), true, '').subscribe((res) => {
      this.documentsFiled = res;
      this.totalData = this.documentService.getPagination.total_records;
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
   * Busca documento por coincidencia
   */
  searchDocumentsByCoincidence(term): void {
    this.preloadSearch = true;
    this.documentService.getAllDocuments(this.documentType, this.pageNumber.toString(), true, term).subscribe((res) => {
      this.documentsFiled = res;
      this.totalData = this.documentService.getPagination.total_records;
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
      this.loadDocuments();
    }
  }

  /**
   * Abre documento en especifico por id
   */
  getDocument(element): void {
    this.router.navigate([`/dashboard/detail/${element.id}/document`]);
  }

  /**
   * Abre el dialogo para asignar radicado
   */
  openDialog(element): void {
    const dialogRef = this.dialog.open(AssingDocumentDialogComponent, {
      width: '500px',
      height: '300px',
      data: element,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((__) => {});
  }
}
