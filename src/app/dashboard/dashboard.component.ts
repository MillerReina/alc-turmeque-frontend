import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public opened: boolean;
  public showMenuDocuments: boolean;
  public showMenuUsers: boolean;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastMessageService) {
    this.showMenuDocuments = false;
    this.showMenuUsers = false;
  }

  ngOnInit(): void {}

  showMessageSuccesfully(): void {
    this.toastService.showSuccessMessage('SESIÓN INICIADA', 'Logueado correctamente');
  }

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

  ngAfterViewInit(): void {
    this.showMessageSuccesfully();
  }
}
