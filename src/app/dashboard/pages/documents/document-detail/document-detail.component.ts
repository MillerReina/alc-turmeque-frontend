import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentsService } from '../../../services/documents.service';
import { IDocumentDetail } from '../../../../interfaces/document-detail-interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { SeeDocumentDialogComponent } from '../components/see-document-dialog/see-document-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ReturnDocumentDialogComponent } from '../components/return-document-dialog/return-document-dialog.component';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent implements OnInit, AfterViewInit {
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

  @ViewChild('viewer') viewerRef: ElementRef;

  constructor(
    private router: Router,
    private documentService: DocumentsService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.idDocument = this.router.url.split('/')[3];
    this.preload = true;
    this.isTheUser = false;
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.getDocumentDetail();
  }

  /**
   * Obtiene los detalles de un documento por id
   */
  getDocumentDetail(): void {
    this.documentService.getDetailDocument(this.idDocument).subscribe((res) => {
      this.actualDocument = res;
      this.isUserAssign();
    });
  }

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
    });
  }

  /**
   * Abre el dialogo para ver radicado
   */
  openDocument(): void {
    const dialogRef = this.dialog.open(SeeDocumentDialogComponent, {
      data: this.actualDocument,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((__) => {});
  }

  returnDocument(): void {
    Swal.fire({
      title: `Devolver solicitud`,
      text: 'Esta acción solo se puede realizar una única vez, ¿desea continuar?',
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
      height: '500px',
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((__) => {});
  }
}
