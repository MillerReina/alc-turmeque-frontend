import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { INotifications } from '../../../interfaces/notification-interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from '../../../services/socket.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackNotificationComponent } from '../snack-notification/snack-notification.component';

@Component({
  selector: 'app-menu-notifications',
  templateUrl: './menu-notifications.component.html',
  styleUrls: ['./menu-notifications.component.scss'],
})
export class MenuNotificationsComponent implements OnInit, OnChanges {
  public quanty;
  /**
   * Array de notificaciones que llega del usuario
   */
  public notifications: INotifications;
  /**
   * Estado del badge
   */
  public hidden: boolean;
  /**
   * Estado de carga
   */
  public preload: boolean;
  /**
   * Suscripcion al wss
   */
  public wsSuscription: Subscription;
  /**
   * Posición horizontal del SnackBar de prorroga
   */
  public horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  /**
   * Posición vertical del SnackBar de prorroga
   */
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private authService: AuthService,
    private router: Router,
    private socketService: SocketService,
    private snackBarExtension: MatSnackBar
  ) {
    this.preload = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.quanty.currentValue != changes.quanty.previousValue) {
    }
  }

  ngOnInit(): void {
    this.listenSocket();
  }

  /* Suscripcion de escucha al socket */
  listenSocket() {
    this.wsSuscription = this.socketService.getMessages(this.authService.getUserID).subscribe((res) => {
      this.quanty = JSON.parse(res.toString()).count;
      if (this.quanty != 0) {
        this.openSnackBar();
      }
    });
  }

  /**
   * Ventana emergente de notificación de prórroga activa
   */
  openSnackBar(): void {
    this.snackBarExtension.openFromComponent(SnackNotificationComponent, {
      data: null,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 6 * 1000,
    });
  }

  /**
   * Obtiene las notificaciones del usuario
   */
  getNotifications(): void {
    this.authService.getNotifications().subscribe((res) => {
      this.notifications = res;
      this.notifications.notifications.reverse();
      this.notifications.notifications.splice(15, this.notifications.notifications.length);
      this.preload = false;
    });
  }

  /**
   * Visibilidad del Badge notifications
   */
  toggleBadgeVisibility(): void {
    this.preload = true;
    this.getNotifications();
  }

  /**
   * Va hacia el documento de la notificación
   */
  goToDocument(id): void {
    this.router.navigate([`/dashboard/detail/${id}/document`]);
  }
}
