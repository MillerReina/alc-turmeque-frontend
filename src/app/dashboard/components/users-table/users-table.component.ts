import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { IRegisteredUser } from '../../../interfaces/registered-user.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProfileInfoDialogComponent } from '../profile-info-dialog/profile-info-dialog.component';

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

  public pageSize: number;
  public pageNumber: number;
  public totalData: number;

  constructor(private usersService: UsersService, public dialog: MatDialog) {
    this.preload = true;
    this.pageSize = 10;
    this.pageNumber = 1;
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
    this.usersService.getAllUsers('', this.pageNumber.toString()).subscribe((res) => {
      this.registeredUsers = res;
      this.totalData = this.usersService.getPagination.total_records;
      this.refreshTable();
    });
  }

  searchUsersByCoincidence(term): void {
    this.preloadSearch = true;
    this.usersService.getAllUsers(term, this.pageNumber.toString()).subscribe((res) => {
      this.registeredUsers = res;
      this.totalData = this.usersService.getPagination.total_records;
      this.refreshTable();
    });
  }

  handlePage(e: PageEvent): void {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    let inputValue = (<HTMLInputElement>document.getElementById('term')).value;
    if (inputValue) {
      this.searchUsersByCoincidence(inputValue);
    } else {
      this.loadUsers();
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
}
