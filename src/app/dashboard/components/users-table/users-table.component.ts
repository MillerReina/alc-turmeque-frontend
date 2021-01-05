import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { IRegisteredUser } from '../../../interfaces/registered-user.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
   * Estado de carga para busqueda
   */
  public preloadSearch: boolean;
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

  public page_size: number;
  public page_number: number;
  public totalData: number;

  constructor(private usersService: UsersService) {
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
    this.usersService.getAllUsers('', this.page_number.toString()).subscribe((res) => {
      this.registeredUsers = res;
      this.totalData = this.usersService.getPagination.total_records;
      this.refreshTable();
    });
  }

  searchUsersByCoincidence(term): void {
    this.preloadSearch = true;
    this.usersService.getAllUsers(term, this.page_number.toString()).subscribe((res) => {
      this.registeredUsers = res;
      this.totalData = this.usersService.getPagination.total_records;
      this.refreshTable();
    });
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
