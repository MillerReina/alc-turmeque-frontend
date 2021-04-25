import { Component, OnInit } from '@angular/core';
import { INotifications } from '../../../interfaces/notification-interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
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

  constructor(private authService: AuthService, private router: Router) {
    this.preload = true;
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  /**
   * Obtiene las notificaciones del usuario
   */
  getNotifications(): void {
    this.authService.getNotifications().subscribe((res) => {
      this.notifications = res;
      this.notifications.notifications.reverse();
      this.notifications.notifications.splice(60, this.notifications.notifications.length);
      this.preload = false;
    });
  }

  /**
   * Va hacia el documento de la notificación
   */
  goToDocument(id): void {
    this.router.navigate([`/dashboard/detail/${id}/document`]);
  }
}
