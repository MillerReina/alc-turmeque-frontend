import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IHistory, ITracking } from '../../interfaces/tracking-interface';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document-tracking',
  templateUrl: './document-tracking.component.html',
  styleUrls: ['./document-tracking.component.scss'],
})
export class DocumentTrackingComponent implements OnInit {
  /**
   * Precarga para el componente de busqueda
   */
  public preload: boolean;
  /**
   * id del documento
   */
  public idDocument: string;
  /**
   * Documento trackeado
   */
  public documentTracked: ITracking;
  /**
   * Cabeceras
   */
  public displayedColumns: string[] = ['accion', 'fecha'];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IHistory>;
  /**
   * Nombre completo del remitente
   */
  public fullName: string;

  constructor(
    private trackingService: TrackingService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.preload = true;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.idDocument = params.id;
      this.searchMyDocument();
    });
  }

  /**
   * Busca el historial de la peticion
   */
  searchMyDocument(): void {
    this.trackingService.getHistoric(this.idDocument).subscribe(
      (res) => {
        this.documentTracked = res;
        this.fullName = res.sender_first_name + ' ' + res.sender_last_name;
        this.dataSource = new MatTableDataSource(this.documentTracked.history);
        this.preload = false;
      },
      (err) => {
        Swal.fire({
          title: 'IMPOSIBLE REALIZAR SEGUIMIENTO',
          text: err.error.error,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        this.router.navigate([`tracking`]);
        this.preload = false;
      }
    );
  }
}
