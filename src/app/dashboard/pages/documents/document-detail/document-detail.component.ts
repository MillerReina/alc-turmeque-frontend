import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../../../services/documents.service';
import { IDocumentDetail } from '../../../../interfaces/document-detail-interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { SeeDocumentDialogComponent } from '../components/see-document-dialog/see-document-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReturnDocumentDialogComponent } from '../components/return-document-dialog/return-document-dialog.component';
import { DocumentHistoryDialogComponent } from '../components/document-history-dialog/document-history-dialog.component';
import { ExtensionDocumentDialogComponent } from '../components/extension-document-dialog/extension-document-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { ResolveDocumentDialogComponent } from '../components/resolve-document-dialog/resolve-document-dialog.component';
import { FinishDocumentDialogComponent } from '../components/finish-document-dialog/finish-document-dialog.component';
import Swal from 'sweetalert2';
import { ToastMessageService } from '../../../../services/toast-message.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent implements OnInit, OnDestroy {
  /**
   * Precarga del documento
   */
  public preload: boolean;
  /**
   * Id  del documento
   */
  public idDocument: string;
  /**
   * Información del documento actual
   */
  public actualDocument: IDocumentDetail;
  /**
   * Verifica que el usuario sea el asignado
   */
  public isTheUser: boolean;
  /**
   * Posición horizontal del SnackBar de prorroga
   */
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  /**
   * Posición vertical del SnackBar de prorroga
   */
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  /**
   * Prórroga activa
   */
  public hasExtensionActive: boolean;
  /**
   * Dos días en ms
   */
  public twoDays = 172800000;
  /**
   * Variable para detectar el tiempo restante
   */
  public timeToResponse: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentService: DocumentsService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBarExtension: MatSnackBar,
    private toastService: ToastMessageService
  ) {
    this.idDocument = this.router.url.split('/')[3];
    this.preload = true;
    this.isTheUser = false;
    this.hasExtensionActive = false;
  }

  ngOnDestroy(): void {
    this.snackBarExtension.dismiss();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.preload = true;
      this.getDocumentDetail(params.id);
    });
  }

  /**
   * Obtiene los detalles de un documento por id
   */
  getDocumentDetail(id): void {
    this.documentService.getDetailDocument(id).subscribe(
      (res) => {
        this.actualDocument = res;
        this.isUserAssign();
        this.getDay();
      },
      (__) => {
        this.router.navigate([`dashboard/all`]);
      }
    );
  }

  /**
   * Detecta si es el usuario asignado al documento
   */
  isUserAssign(): void {
    this.authService.getMyDetails().subscribe((res) => {
      if (this.actualDocument.user_assign === null) {
        this.preload = false;
      } else if (res.user.username === this.actualDocument.user_assign.username) {
        this.isTheUser = true;
        this.preload = false;
      } else {
        this.preload = false;
      }
      this.itHasExtensionActive();
      if (this.timeToResponse === 1 || this.timeToResponse === 2) {
        this.emitAlert();
      }
    });
  }

  /**
   * Abre el dialogo para ver el radicado
   */
  openDocument(): void {
    this.documentService.getDetailDocument(this.idDocument).subscribe(
      (res) => {
        this.actualDocument = res;
        const dialogRef = this.dialog.open(SeeDocumentDialogComponent, {
          data: this.actualDocument,
          autoFocus: false,
        });

        dialogRef.afterClosed().subscribe((__) => {});
      },
      (__) => {
        this.router.navigate([`dashboard/all`]);
      }
    );
  }

  /**
   * Abre el dialog para poder ver el historial de un documento
   */
  openDialog(element): void {
    const dialogRef = this.dialog.open(DocumentHistoryDialogComponent, {
      width: '900px',
      height: '450px',
      data: element,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((__) => {});
  }

  /**
   * Abre el dialog para poder solicitar prorroga
   */
  openDialogExtension(element): void {
    const dialogRef = this.dialog.open(ExtensionDocumentDialogComponent, {
      height: '400px',
      width: '500px',
      data: element,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((__) => {});
  }

  /**
   * Aviso de advertencia para devolver un radicado
   */
  returnDocument(): void {
    Swal.fire({
      title: `Devolver solicitud`,
      html: 'Esta acción solo se puede realizar <b>una única vez</b>, ¿desea continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d59c9',
      cancelButtonColor: '#ff007d',
      confirmButtonText: '¡Sí, devolver!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.openReturnDocument();
      }
    });
  }

  /**
   * Abre el dialogo para devolver radicado
   */
  openReturnDocument(): void {
    const dialogRef = this.dialog.open(ReturnDocumentDialogComponent, {
      data: this.actualDocument,
      height: '400px',
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((__) => {});
  }

  itHasExtensionActive(): void {
    if (JSON.stringify(this.actualDocument.extension) === '{}') {
    } else if (this.isTheUser === false) {
      this.openSnackBar();
    }
  }

  /**
   * Ventana emergente de notificación de prórroga activa
   */
  openSnackBar(): void {
    this.snackBarExtension.openFromComponent(SnackBarComponent, {
      data: this.actualDocument,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /**
   * Ciera el snackbar de notificacion de prórroga activa
   */
  closeSnackBar(): void {
    this.snackBarExtension.dismiss();
  }

  /**
   * Abre el dialog para poder cargar los documentos de requerimiento
   */
  openResolveDocumentDialog(element): void {
    const dialogRef = this.dialog.open(ResolveDocumentDialogComponent, {
      width: '900px',
      height: '600px',
      data: element,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((__) => {});
  }

  /**
   * Abre el dialog para poder cargar los documentos de requerimiento
   */
  openFinishDocumentDialog(element): void {
    const dialogRef = this.dialog.open(FinishDocumentDialogComponent, {
      height: '400px',
      width: '540px',
      data: element,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((__) => {});
  }

  /**
   * Manejo de días para la notificación
   */
  getDay(): void {
    const endDate = new Date(this.actualDocument.end_date);
    const today = new Date();
    const responseTime = endDate.getTime() - today.getTime();

    if (
      responseTime < this.twoDays &&
      responseTime >= 0 &&
      this.actualDocument.document_state !== 'RE' &&
      this.actualDocument.document_state !== 'FI'
    ) {
      this.timeToResponse = 1;
    } else if (
      endDate.getTime() < today.getTime() &&
      this.actualDocument.document_state !== 'RE' &&
      this.actualDocument.document_state !== 'FI'
    ) {
      this.timeToResponse = 2;
    } else {
      this.timeToResponse = 0;
    }
  }

  /**
   * Emite la alerta de tiempo
   */
  emitAlert(): void {
    if (
      this.timeToResponse === 1 &&
      this.actualDocument.document_state !== 'RE' &&
      this.actualDocument.document_state !== 'FI'
    ) {
      this.toastService.showWarningMessageAlmostTime(
        '¡REQUIERE ATENCIÓN!',
        `Este requerimiento está pronto a vencer fecha máxima: ${this.actualDocument.end_date}`
      );
    }
    if (
      this.timeToResponse === 2 &&
      this.actualDocument.document_state !== 'FI' &&
      this.actualDocument.document_state !== 'RE'
    ) {
      this.toastService.showErrorMessageNotTime(
        '¡SIN SOLUCIONAR!',
        `Requerimiento vencido y sin respuesta, requiere atención.`
      );
    }
  }
}
