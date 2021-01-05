import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsersService } from '../../services/users.service';
import { IRegisteredOfficers } from '../../../interfaces/registered-officers.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ProfileInfoDialogComponent } from '../profile-info-dialog/profile-info-dialog.component';
import { $ } from 'protractor';

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
   * Estado de carga para busqueda
   */
  public preloadSearch: boolean;
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

  public page_size: number;
  public page_number: number;
  public totalData: number;

  constructor(private usersService: UsersService, public dialog: MatDialog) {
    this.preload = true;
    this.page_size = 10;
    this.page_number = 1;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.registeredUsers);
    this.dataSource.paginator = this.paginator;
    this.preload = false;
    this.preloadSearch = false;
  }

  loadUsers(): void {
    this.preloadSearch = true;
    this.usersService.getAllOfficers('', this.page_number.toString(), true).subscribe((res) => {
      this.registeredUsers = res;
      this.totalData = this.usersService.getPagination.total_records;
      this.refreshTable();
    });
  }

  searchUsersByCoincidence(term): void {
    this.preloadSearch = true;
    this.usersService.getAllOfficers(term, this.page_number.toString(), true).subscribe((res) => {
      this.registeredUsers = res;
      this.totalData = this.usersService.getPagination.total_records;
      this.refreshTable();
    });
  }

  activateUser(element): void {
    this.preload = true;
    if (element.is_active) {
      this.usersService.activateUser(element.id).subscribe((__) => {
        Swal.fire({
          title: 'CUENTA DESACTIVADA',
          text: `El usuario: ${element.username} ha sido desactivado`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.loadUsers();
      });
    } else {
      this.usersService.activateUser(element.id).subscribe((__) => {
        Swal.fire({
          title: 'CUENTA ACTIVADA',
          text: `El usuario: ${element.username} ha sido activado`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.loadUsers();
      });
    }
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(ProfileInfoDialogComponent, {
      width: '500px',
      height: '500px',
      data: element,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((__) => {});
  }

  handlePage(e: PageEvent): void {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
    let inputValue = (<HTMLInputElement>document.getElementById('term')).value;
    if (inputValue) {
      this.searchUsersByCoincidence(inputValue);
    } else {
      this.loadUsers();
    }
  }
}
