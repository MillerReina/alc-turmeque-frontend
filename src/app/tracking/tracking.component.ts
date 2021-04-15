import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TrackingService } from '../services/tracking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {
  /**
   * Formulario reactivo para crear documento
   */
  public registerForm: FormGroup;
  /**
   * Precarga para el componente de busqueda
   */
  public preload: boolean;
  /**
   * Esta buscando
   */
  public isSearching: boolean;

  constructor(private fb: FormBuilder, private trackingService: TrackingService, private router: Router) {
    this.createRegisterForm();
    this.preload = false;
    this.isSearching = false;
  }

  ngOnInit(): void {}

  get idDocumentIsInvalid(): boolean {
    return this.registerForm.get('id_document').invalid && this.registerForm.get('id_document').touched;
  }

  /**
   * Crea la instancia del formulario reactivo
   */
  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      id_document: ['202104000005', [Validators.required]],
    });
  }

  /**
   * Busca el historial de la peticion
   */

  searchMyDocument(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      const idDocument = this.registerForm.get('id_document').value;

      this.trackingService.getHistoric(idDocument).subscribe(
        (__) => {
          this.router.navigate([`tracking/${idDocument}/document`]);
          this.preload = false;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
