import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { IRegisteredUser } from '../../../interfaces/registered-user.interface';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  /**
   * Estado de carga
   */
  public preload: boolean;
  /**
   * Arreglo de usuarios registrados en el sistema
   */
  public registeredUsers: IRegisteredUser[];
  /**
   * Atributos de la tabla como cabeceras
   */
  public displayedColumns: string[] = ['nombre', 'apellido', 'identificacion', 'email', 'telefono', 'direccion'];
  /**
   * Información fuente que se carga desde el servicio
   */
  public dataSource: MatTableDataSource<IRegisteredUser>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private usersService: UsersService) {
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
    this.usersService.getAllUsers('', '0').subscribe((res) => {
      this.registeredUsers = res;
      this.refreshTable();
    });
  }

  searchUsersByCoincidence(term): void {
    this.usersService.getAllUsers(term, '0').subscribe((res) => {
      this.registeredUsers = res;
      this.refreshTable();
    });
  }
}
