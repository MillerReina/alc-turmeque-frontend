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
   * Estado de ocultar/mostrar para el dialog
   */
  public isOfficer: boolean;
  /**
   * Usuario actual con el que se abre el dialog
   */
  public actualUser: IRegisteredOfficers;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ProfileInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRegisteredOfficers
  ) {
    this.isOfficer = false;
  }

  ngOnInit(): void {
    this.actualUser = this.data;
    this.activateStateOfficer();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  activateStateOfficer(): void {
    if (this.actualUser.is_active === undefined) {
      this.isOfficer = false;
    } else {
      this.isOfficer = true;
    }
  }
  editUser(): void {
    if (!this.isOfficer) {
      this.router.navigate([`/dashboard/edit/${this.actualUser.id}/user`]);
    } else {
      this.router.navigate([`/dashboard/edit/${this.actualUser.id}/officer`]);
    }
    this.dialogRef.close();
  }
}
