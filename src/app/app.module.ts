import { TrackingModule } from './tracking/tracking.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './dashboard/i18n/paginator-es';
import { SharedModule } from './shared/shared.module';
import { AngularMaterialModule } from './shared-module/angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    TrackingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DatePipe,
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
