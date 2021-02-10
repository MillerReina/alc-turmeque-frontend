import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-documents',
  templateUrl: './title-documents.component.html',
  styleUrls: ['./title-documents.component.scss'],
})
export class TitleDocumentsComponent implements OnInit {
  @Input() titleHeader;

  constructor() {}

  ngOnInit(): void {}

  generateDocument(): void {}
}
