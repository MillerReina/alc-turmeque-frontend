import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocTypesDialogComponent } from './components/doc-types-dialog/doc-types-dialog.component';

@Component({
  selector: 'app-doc-types',
  templateUrl: './doc-types.component.html',
  styleUrls: ['./doc-types.component.scss'],
})
export class DocTypesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  /**
   * Abre el dialogo para poder crear o editar
   */
  createDocType(): void {
    const dialogRef = this.dialog.open(DocTypesDialogComponent, {
      width: '500px',
      height: '350px ',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((__) => {});
  }
}
