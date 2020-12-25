import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public opened: boolean;
  public showMenuDocuments: boolean;
  public showMenuUsers: boolean;

  constructor() {
    this.showMenuDocuments = false;
    this.showMenuUsers = false;
  }

  ngOnInit(): void {}

  toggleMenuDocuments(): void {
    this.showMenuDocuments = !this.showMenuDocuments;
  }
  toggleMenuUsers(): void {
    this.showMenuUsers = !this.showMenuUsers;
  }
}
