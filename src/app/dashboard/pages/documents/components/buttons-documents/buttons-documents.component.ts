import { Component, Input, OnInit } from '@angular/core';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import { SeeReponsesDialogComponent } from '../see-reponses-dialog/see-reponses-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DocumentsService } from '../../../../services/documents.service';

@Component({
  selector: 'app-buttons-documents',
  templateUrl: './buttons-documents.component.html',
  styleUrls: ['./buttons-documents.component.scss'],
})
export class ButtonsDocumentsComponent implements OnInit {
  /**
   * Documento actual
   */
  @Input() actualDocument: IDocumentDetail;
  /**
   * Precarga cuando se solicita el comprobante
   */
  public preload: boolean;

  constructor(public dialog: MatDialog, private documentService: DocumentsService) {}

  ngOnInit(): void {}

  /**
   * Abre el dialog para poder descargar los documentos del requerimiento
   */
  openResolveFiles(): void {
    const dialogRef = this.dialog.open(SeeReponsesDialogComponent, {
      width: '900px',
      height: '400px',
      data: this.actualDocument.id,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((__) => {});
  }

  /**
   * Abre una nueva ventana para ver el documento seleccionado
   */
  fileInformation(): void {
    this.preload = true;
    this.documentService.getDetailDocument(this.actualDocument.id).subscribe((res) => {
      this.preload = false;
      window.open(res.file_finalized, '_blank');
    });
  }
}
