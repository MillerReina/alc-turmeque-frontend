import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
/* Core */
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import localeES from '@angular/common/locales/es';
registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, AuthModule, BrowserAnimationsModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
