import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentsService } from '../../../services/documents.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent implements OnInit, AfterViewInit {
  /**
   * Precarga del documento
   */
  public preload: boolean;
  /**
   * Id  del documento
   */
  public idDocument: string;
  /**
   * Recurso del documento - path
   */
  public pdfSrc: string;

  @ViewChild('viewer') viewerRef: ElementRef;

  constructor(private router: Router, private documentService: DocumentsService) {
    this.idDocument = this.router.url.split('/')[3];
    this.preload = true;
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.getDocumentDetail();
  }

  getDocumentDetail(): void {
    this.documentService.getDetailDocument(this.idDocument).subscribe((res) => {
      this.pdfSrc = res.file_document;
      this.preload = false;
    });
  }
}
