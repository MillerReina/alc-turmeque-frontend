import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDocumentDetail, TraceHistory } from '../../../../../interfaces/document-detail-interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-document-history-dialog',
  templateUrl: './document-history-dialog.component.html',
  styleUrls: ['./document-history-dialog.component.scss'],
})
export class DocumentHistoryDialogComponent implements OnInit {
  public displayedColumns: string[] = ['accion', 'usuario', 'comentario'];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<TraceHistory>;
  /**
   * Historial del documento
   */
  public documentHistory: TraceHistory[];

  constructor(
    public dialogRef: MatDialogRef<DocumentHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDocumentDetail
  ) {
    this.documentHistory = data.history;
    this.dataSource = new MatTableDataSource(this.documentHistory);
  }

  ngOnInit(): void {}

  /**
   * Cierra el dialog
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
