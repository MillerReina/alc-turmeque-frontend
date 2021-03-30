import { Component, Input, OnInit } from '@angular/core';
import { INotifications } from '../../../interfaces/notification-interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-menu-notifications',
  templateUrl: './menu-notifications.component.html',
  styleUrls: ['./menu-notifications.component.scss'],
})
export class MenuNotificationsComponent implements OnInit {
  /**
   * Array de notificaciones que llega del usuario
   */
  @Input() notifications: INotifications;
  /**
   * Estado del badge
   */
  public hidden: boolean;
  /**
   * Estado de carga
   */
  public preload: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.notifications.notifications.reverse();
  }
  /**
   * Obtiene las notificaciones del usuario
   */
  getNotifications(): void {
    this.authService.getNotifications().subscribe((res) => {
      this.notifications = res;
      this.notifications.notifications.reverse();
      this.preload = false;
    });
  }

  /**
   * Visibilidad del Badge notifications
   */
  toggleBadgeVisibility(): void {
    this.preload = true;
    this.hidden = !this.hidden;
    this.getNotifications();
  }

  /**
   * Analiza el día para devolver un registro de fecha
   */
  getDay(element) {
    const date = new Date(element.register_date);
    const today = new Date();
    const responseTime = date.getTime() - today.getTime();
    const value = responseTime.toString().substring(1, 2);
    /* console.log(responseTime + '  num' + element.id); */
    if (value === '7' || value === '8' || value === '9') {
      return 'Hoy';
    } else if (value === '1') {
      return 'Ayer';
    } else if (value === '2') {
      return 'Hace dos días';
    } else {
      return element.register_date;
    }
  }
}
