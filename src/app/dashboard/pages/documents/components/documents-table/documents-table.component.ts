import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IDocument } from '../../../../../interfaces/documents-interface';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.scss'],
})
export class DocumentsTableComponent implements OnInit {
  /**
   * Tipo de documento que se va a cargar
   */
  @Input() documentType: string;
  /**
   * Estado de carga
   */
  public preload: boolean;
  /**
   * Columnas de la tabla
   */
  public displayedColumns: string[] = [
    'radicado',
    'estado',
    'fecha_registro',
    'remitente',
    'dependencia',
    'tipo_documento',
    'asignado_a',
  ];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IDocument>;

  constructor() {}

  ngOnInit(): void {
    console.log(this.documentType);
  }
}
