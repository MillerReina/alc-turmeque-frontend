import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { ToastMessageService } from '../services/toast-message.service';
import { User } from '../models/user.model';
import { MatSidenav } from '@angular/material/sidenav';
import { INotifications } from '../interfaces/notification-interface';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
   * Estado activo/inactivo del menu solicitudes
   */
  public showMenuExternal: boolean;
  /**
   * Estado activo/inactivo del menu usuarios
   */
  public showMenuUsers: boolean;
  /**
   * Estado activo/inactivo del menu reportes
   */
  public showMenuReports: boolean;
  /**
   * Estado activo/inactivo del menu reportes
   */
  public showMenuGraphics: boolean;
  /**
   * Rol administrador?
   */
  public isAdmin: boolean;
  /**
   * usuario
   */
  public user: User;
  /**
   * Arreglo de notificaciones
   */
  public notifications: INotifications;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastMessageService,
    private socketService: SocketService
  ) {
    this.showMenuDocuments = false;
    this.showMenuUsers = false;
    this.showMenuExternal = false;
    this.showMenuGraphics = false;
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
    if (this.authService.isAdminConfirmation) {
      this.isAdmin = true;
    }
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
      this.toastService.showSuccessMessage('SESIÓN INICIADA', `Logueado como: ${this.user.firstName.toUpperCase()}`);
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
   * Ocultar/mostrar menu reportes
   */
  toggleMenuReports(): void {
    this.showMenuReports = !this.showMenuReports;
  }

  /**
   * Ocultar/mostrar menu solicitudes externas
   */
  toggleMenuExternal(): void {
    this.showMenuExternal = !this.showMenuExternal;
  }

  /**
   * Ocultar/mostrar menu de gráficos
   */
  toggleMenuGraphics(): void {
    this.showMenuGraphics = !this.showMenuGraphics;
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    this.authService.logout();
    this.socketService.closeSocket();
    this.router.navigateByUrl('/login');
  }
}
