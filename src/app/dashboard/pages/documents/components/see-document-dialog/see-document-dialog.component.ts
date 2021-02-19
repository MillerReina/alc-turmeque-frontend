import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import FileSaver from 'file-saver/dist/FileSaver';

@Component({
  selector: 'app-see-document-dialog',
  templateUrl: './see-document-dialog.component.html',
  styleUrls: ['./see-document-dialog.component.scss'],
})
export class SeeDocumentDialogComponent implements OnInit {
  /**
   * Recurso del documento - path
   */
  public pdfSrc: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDocumentDetail,
    public dialogRef: MatDialogRef<SeeDocumentDialogComponent>
  ) {
    this.pdfSrc = this.data.file_document;
  }

  ngOnInit(): void {}

  downloadDocument(): void {
    FileSaver.saveAs(`${this.pdfSrc}`, 'mypdf.pdf');
  }

  loadingDocument() {
    console.log('HGOLA');
  }

  /**
   * Cierra el dialog
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
