import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Fabian', weight: 'Peréz', symbol: 'Comisaria de familia' },
  { position: 2, name: 'Fabian', weight: 'Peréz', symbol: 'Comisaria de familia' },
  { position: 3, name: 'Fabian', weight: 'Peréz', symbol: 'Comisaria de familia' },
  { position: 4, name: 'Fabian', weight: 'Peréz', symbol: 'Comisaria de familia' },
  { position: 5, name: 'Fabian', weight: 'Peréz', symbol: 'Comisaria de familia' },
  { position: 6, name: 'Fabian', weight: 'Peréz', symbol: 'Comisaria de familia' },
  { position: 7, name: 'Fabian', weight: 'Peréz', symbol: 'Comisaria de familia' },
  { position: 8, name: 'Fabian', weight: 'Peréz', symbol: 'Comisaria de familia' },
  { position: 9, name: 'Fabian', weight: 'Peréz', symbol: 'Comisaria de familia' },
  { position: 10, name: 'Fabian', weight: 'Peréz', symbol: 'Comisaria de familia' },
];

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'dependencia'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
