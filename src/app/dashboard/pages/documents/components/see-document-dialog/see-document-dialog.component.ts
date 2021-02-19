import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import FileSaver from 'file-saver/dist/FileSaver';
import { PDFProgressData } from 'pdfjs-dist';

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
  /**
   * Precarga del pdf
   */
  public preload: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDocumentDetail,
    public dialogRef: MatDialogRef<SeeDocumentDialogComponent>
  ) {
    this.pdfSrc = this.data.file_document;
    this.preload = true;
  }

  ngOnInit(): void {}

  downloadDocument(): void {
    FileSaver.saveAs(`${this.pdfSrc}`, 'mypdf.pdf');
  }

  onProgress(progressData: PDFProgressData): void {
    if (progressData) {
      this.preload = true;
    }
  }

  changeState(): void {
    this.preload = false;
  }

  /**
   * Cierra el dialog
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
