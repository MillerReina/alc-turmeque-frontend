import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IRegisteredOfficers } from '../../../interfaces/registered-officers.interface';

@Component({
  selector: 'app-profile-info-dialog',
  templateUrl: './profile-info-dialog.component.html',
  styleUrls: ['./profile-info-dialog.component.scss'],
})
export class ProfileInfoDialogComponent implements OnInit {
  /**
   * Usuario actual con el que se abre el dialog
   */
  public actualUser: IRegisteredOfficers;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ProfileInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRegisteredOfficers
  ) {}

  ngOnInit(): void {
    this.actualUser = this.data;
  }
  /**
   * Cierra el modal
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Redirige a la interfaz de editar
   */
  editUser(): void {
    this.router.navigate([`/dashboard/edit/${this.actualUser.id}/officer`]);
    this.dialogRef.close();
  }
}
