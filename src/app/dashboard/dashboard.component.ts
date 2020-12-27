import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public opened: boolean;
  public showMenuDocuments: boolean;
  public showMenuUsers: boolean;

  constructor(private authService: AuthService, private router: Router) {
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

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
