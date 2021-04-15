import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-tracking',
  templateUrl: './search-tracking.component.html',
  styleUrls: ['./search-tracking.component.scss'],
})
export class SearchTrackingComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private router: Router) {
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
      id_document: ['', [Validators.required]],
    });
  }

  /**
   * Busca el historial de la peticion
   */

  searchMyDocument(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.preload = true;
      const idDocument = this.registerForm.get('id_document').value;
      this.router.navigate([`tracking/${idDocument}/document`]);
      this.preload = false;
    }
  }
}
