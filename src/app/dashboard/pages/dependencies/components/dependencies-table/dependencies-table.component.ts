import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DepenciesService } from 'src/app/dashboard/services/depencies.service';
import { IDepedency } from 'src/app/interfaces/dependency-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dependencies-table',
  templateUrl: './dependencies-table.component.html',
  styleUrls: ['./dependencies-table.component.scss'],
})
export class DependenciesTableComponent implements OnInit {
  /**
   * Estado de carga
   */
  public preload: boolean;
  public displayedColumns: string[] = ['dependencia', 'editar', 'borrar'];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IDepedency>;
  /**
   * Arreglo de dependencias registradas en el sistema
   */
  public dependencies: IDepedency[];

  constructor(private dependeciesService: DepenciesService) {
    this.preload = true;
  }

  ngOnInit(): void {
    this.loadDependencies();
  }

  loadDependencies(): void {
    this.dependeciesService.getAllDependecies().subscribe((res) => {
      this.dependencies = res;
      this.refreshTable();
    });
  }

  refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.dependencies);
    this.preload = false;
  }

  openDialog(element) {}

  deleteDependency(element: IDepedency): void {
    this.dependeciesService.deleteDependencyById(element.id).subscribe(
      (__) => {
        Swal.fire({
          title: 'Cuenta confirmada',
          icon: 'warning',
          text: 'Esta cuenta ya ha sido activada.',
          confirmButtonText: 'Aceptar',
        });
      },
      (__) => {
        Swal.fire({
          title: 'No se puede borrar!',
          icon: 'error',
          text: 'La dependencia tiene funcionarios asociados.',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }
}
