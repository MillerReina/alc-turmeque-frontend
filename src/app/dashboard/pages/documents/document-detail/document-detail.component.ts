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
   * Id  del documento
   */
  public idDocument: string;
  public pdfSrc = 'https://www.orientacionandujar.es/wp-content/uploads/2014/09/TEST-ESTILO-DEAPRENDIZAJES.pdf';
  @ViewChild('viewer') viewerRef: ElementRef;

  constructor(private router: Router, private documentService: DocumentsService) {
    this.idDocument = this.router.url.split('/')[3];
  }

  ngAfterViewInit(): void {
    /* WebViewer(
      {
        path: '../assets/lib',
        initialDoc: 'https://www.orientacionandujar.es/wp-content/uploads/2014/09/TEST-ESTILO-DEAPRENDIZAJES.pdf',
      },
      this.viewerRef.nativeElement
    ).then((instance) => {
      instance.setLanguage('es');
    }); */
  }

  ngOnInit(): void {
    this.getDocumentDetail();
  }

  getDocumentDetail(): void {
    this.documentService.getDetailDocument(this.idDocument).subscribe((res) => {
      console.log(res);
    });
  }
}
