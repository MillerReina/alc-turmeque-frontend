import { Component, Input, OnInit } from '@angular/core';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import { MatDialog } from '@angular/material/dialog';
import { DocumentsService } from '../../../../services/documents.service';
import { SeeReponsesDialogComponent } from '../../../documents/components/see-reponses-dialog/see-reponses-dialog.component';

@Component({
  selector: 'app-buttons-component',
  templateUrl: './buttons-component.component.html',
  styleUrls: ['./buttons-component.component.scss'],
})
export class ButtonsComponentComponent implements OnInit {
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
