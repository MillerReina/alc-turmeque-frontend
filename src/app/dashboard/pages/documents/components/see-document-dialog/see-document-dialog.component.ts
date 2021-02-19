import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import { saveAs } from 'file-saver';

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
    var file = new Blob(['https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'], {
      type: 'application/pdf',
    });
    saveAs(file, 'mypdffilename.pdf');
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
