import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRegisteredOfficers } from '../../../interfaces/registered-officers.interface';

@Component({
  selector: 'app-profile-info-dialog',
  templateUrl: './profile-info-dialog.component.html',
  styleUrls: ['./profile-info-dialog.component.scss'],
})
export class ProfileInfoDialogComponent implements OnInit {
  public actualUser: IRegisteredOfficers;

  constructor(
    public dialogRef: MatDialogRef<ProfileInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRegisteredOfficers
  ) {}

  ngOnInit(): void {
    this.actualUser = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
