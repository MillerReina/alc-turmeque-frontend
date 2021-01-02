import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { ToastMessageService } from '../services/toast-message.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  /**
   * preload
   */
  public preload: boolean;
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
  /**
   * Rol administrador?
   */
  public isAdmin: boolean;
  /**
   * usuario
   */
  public user: User;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastMessageService) {
    this.showMenuDocuments = false;
    this.showMenuUsers = false;
    this.isAdmin = false;
    this.preload = true;
  }

  ngOnInit(): void {
    this.changeVisibility();
    this.getUserFromService();
  }
  /**
   * Cambiar la visibilidad de acuerdo a mi rol
   */
  changeVisibility(): void {
    this.authService.getRole.forEach((element: any) => {
      if (element.name === 'Administrador') {
        this.isAdmin = true;
      }
    });
    setTimeout(() => {
      this.preload = false;
      this.showMessageSuccesfully();
    }, 1000);
  }
  /**
   * Obtiene la información del usuario
   */
  getUserFromService(): void {
    this.user = this.authService.user;
  }

  /**
   * Mensaje toast cuando inicio sesión
   */
  showMessageSuccesfully(): void {
    setTimeout(() => {
      this.toastService.showSuccessMessage('SESIÓN INICIADA', `Logueado correctamente como ${this.user.firstName}`);
    }, 500);
  }
  /**
   * Ocultar/mostrar menu documentos
   */
  toggleMenuDocuments(): void {
    this.showMenuDocuments = !this.showMenuDocuments;
  }
  /**
   * Ocultar/mostrar menu usuarios
   */
  toggleMenuUsers(): void {
    this.showMenuUsers = !this.showMenuUsers;
  }
  /**
   * Cerrar sesión
   */
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  /**
   * Visibilidad del Badge notifications
   */
  toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
  }

  ngAfterViewInit(): void {}
}
