import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';

@Component({
  selector: 'app-see-reponses-dialog',
  templateUrl: './see-reponses-dialog.component.html',
  styleUrls: ['./see-reponses-dialog.component.scss'],
})
export class SeeReponsesDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SeeReponsesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDocumentDetail
  ) {
    console.log(data);
  }

  ngOnInit(): void {}
}
