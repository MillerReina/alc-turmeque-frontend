import { Component, Input, OnInit } from '@angular/core';
import { INotifications } from '../../../interfaces/notification-interface';

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

  constructor() {}

  ngOnInit(): void {
    this.notifications.notifications.reverse();
  }

  /**
   * Visibilidad del Badge notifications
   */
  toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
  }

  getDay(element) {
    const date = new Date(element.register_date);
    const today = new Date();
    const responseTime = date.getTime() - today.getTime();
    if (responseTime.toString().substring(1, 2) === '9') {
      return 'Hoy';
    } else if (responseTime.toString().substring(1, 2) === '1') {
      return 'Ayer';
    } else {
      return element.register_date;
    }
  }
}
