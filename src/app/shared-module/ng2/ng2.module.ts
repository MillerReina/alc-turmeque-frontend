import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserModule, PdfViewerModule],
  providers: [],
  exports: [PdfViewerModule],
})
export class Ng2Module {}

platformBrowserDynamic().bootstrapModule(Ng2Module);
