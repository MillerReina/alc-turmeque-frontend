import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../../../services/documents.service';
import { IDocumentDetail } from '../../../../interfaces/document-detail-interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { ToastMessageService } from '../../../../services/toast-message.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DocumentHistoryDialogComponent } from '../../documents/components/document-history-dialog/document-history-dialog.component';
import { SnackBarComponent } from '../../documents/components/snack-bar/snack-bar.component';
import { ResolveDocumentDialogComponent } from '../../documents/components/resolve-document-dialog/resolve-document-dialog.component';
import { SeeDocumentDialogComponent } from '../../documents/components/see-document-dialog/see-document-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-external-detail',
  templateUrl: './external-detail.component.html',
  styleUrls: ['./external-detail.component.scss'],
})
export class ExternalDetailComponent implements OnInit, OnDestroy {
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
      this.closeSnackBar();
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
      if (this.actualDocument.user_register === null) {
        this.preload = false;
      } else if (res.user.username === this.actualDocument.user_register.username) {
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
   * Abre el dialog para poder finalizar la solicitud externa
   */
  openFinishDocumentDialog(): void {
    Swal.fire({
      title: `Finalizar solicitud`,
      html: '¿Desea marcar esta solicitud externa como <b>finalizada</b>?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d59c9',
      cancelButtonColor: '#ff007d',
      confirmButtonText: '¡Sí, finalizar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService
          .finishDocument(this.actualDocument.id, '')
          .subscribe((__) => this.router.navigate([`dashboard/external`]));
      }
    });
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
