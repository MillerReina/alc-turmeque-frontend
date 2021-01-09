import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DependencyDialogComponent } from './components/dependency-dialog/dependency-dialog.component';

@Component({
  selector: 'app-dependices',
  templateUrl: './dependices.component.html',
  styleUrls: ['./dependices.component.scss'],
})
export class DependicesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Abre el dialogo para poder crear o editar
   */
  createDependency(): void {
    const dialogRef = this.dialog.open(DependencyDialogComponent, {
      width: '500px',
      height: '300px ',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((__) => {});
  }
}
