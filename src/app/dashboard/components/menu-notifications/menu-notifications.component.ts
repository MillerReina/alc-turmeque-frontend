import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-notifications',
  templateUrl: './menu-notifications.component.html',
  styleUrls: ['./menu-notifications.component.scss'],
})
export class MenuNotificationsComponent implements OnInit {
  /**
   * Estado del badge
   */
  public hidden: boolean;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Visibilidad del Badge notifications
   */
  toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
  }
}
