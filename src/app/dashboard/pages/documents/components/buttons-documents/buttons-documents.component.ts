import { Component, Input, OnInit } from '@angular/core';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import { SeeReponsesDialogComponent } from '../see-reponses-dialog/see-reponses-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Abre el dialog para poder descargar los documentos del requerimiento
   */
  openResolveFiles(): void {
    const dialogRef = this.dialog.open(SeeReponsesDialogComponent, {
      width: '900px',
      height: '450px',
      data: this.actualDocument,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((__) => {});
  }
}
