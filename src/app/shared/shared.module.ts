import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../shared-module/angular-material/angular-material.module';

/* Componentes */
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
