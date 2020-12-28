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
  /**
   * Estado del sidenav
   */
  public opened: boolean;
  /**
   * Estado activo/inactivo del menu documentos
   */
  public showMenuDocuments: boolean;
  /**
   * Estado activo/inactivo del menu usuarios
   */
  public showMenuUsers: boolean;
  /**
   * Estado del badge
   */
  public hidden: boolean;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastMessageService) {
    this.showMenuDocuments = false;
    this.showMenuUsers = false;
  }

  ngOnInit(): void {}

  showMessageSuccesfully(): void {
    setTimeout(() => {
      this.toastService.showSuccessMessage('SESIÓN INICIADA', 'Logueado correctamente');
    }, 500);
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

  toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
  }

  ngAfterViewInit(): void {
    this.showMessageSuccesfully();
  }
}
