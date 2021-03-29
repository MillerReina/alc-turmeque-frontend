import { Component, Input, OnInit } from '@angular/core';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';

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

  constructor() {}

  ngOnInit(): void {
    console.log(this.actualDocument);
  }
}
