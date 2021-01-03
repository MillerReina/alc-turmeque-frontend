import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from '../../services/users.service';
import { IRegisteredOfficers } from '../../../interfaces/registered-officers.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ProfileInfoDialogComponent } from '../profile-info-dialog/profile-info-dialog.component';

@Component({
  selector: 'app-officers-table',
  templateUrl: './officers-table.component.html',
  styleUrls: ['./officers-table.component.scss'],
})
export class OfficersTableComponent implements OnInit {
  /**
   * Estado de carga
   */
  public preload: boolean;
  /**
   * Arreglo de usuarios registrados en el sistema
   */
  public registeredUsers: IRegisteredOfficers[];
  /**
   * Atributos de la tabla como cabeceras
   */
  public displayedColumns: string[] = [
    'usuario',
    'email',
    'nombre',
    'apellido',
    'identificacion',
    'estado',
    'dependencia',
  ];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IRegisteredOfficers>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private usersService: UsersService, public dialog: MatDialog) {
    this.preload = true;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.registeredUsers);
    this.dataSource.paginator = this.paginator;
    this.preload = false;
  }

  loadUsers(): void {
    this.usersService.getAllOfficers('', '0', true).subscribe((res) => {
      this.registeredUsers = res;
      this.refreshTable();
    });
  }

  searchUsersByCoincidence(term): void {
    this.usersService.getAllOfficers(term, '0', true).subscribe((res) => {
      this.registeredUsers = res;
      this.refreshTable();
    });
  }

  activateUser(element): void {
    this.usersService.activateUser(element.id).subscribe((__) => {
      Swal.fire({
        title: 'Cuenta desactivada',
        text: `El usuario: ${element.first_name} ha sido desactivado`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    });
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(ProfileInfoDialogComponent, {
      width: '450px',
      height: '600px',
      data: element,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
