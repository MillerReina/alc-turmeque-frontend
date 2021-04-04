import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import { DocumentsService } from '../../../../services/documents.service';

@Component({
  selector: 'app-see-reponses-dialog',
  templateUrl: './see-reponses-dialog.component.html',
  styleUrls: ['./see-reponses-dialog.component.scss'],
})
export class SeeReponsesDialogComponent implements OnInit {
  /**
   * Preload
   */
  public preload: boolean;
  /**
   * Variable para la dependencia actual
   */
  public actualDocument: IDocumentDetail;
  /**
   * Archivo de subida
   */
  public files: File[] = [];

  constructor(
    private documentService: DocumentsService,
    public dialogRef: MatDialogRef<SeeReponsesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: IDocumentDetail
  ) {
    this.preload = true;
  }

  ngOnInit(): void {
    this.getDocumentDetail(this.id);
  }

  /**
   * Obtiene los detalles de un documento por id
   */
  getDocumentDetail(id): void {
    this.documentService.getDetailDocument(id).subscribe((res) => {
      this.actualDocument = res;
      this.files = res.response.files;
      this.preload = false;
    });
  }

  /**
   * Abre una nueva ventana para ver el documento seleccionado
   */
  fileInformation(file): void {
    window.open(file.file_annex, '_blank');
  }
}
