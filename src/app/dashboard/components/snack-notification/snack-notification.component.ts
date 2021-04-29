import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-snack-notification',
  templateUrl: './snack-notification.component.html',
  styleUrls: ['./snack-notification.component.scss'],
})
export class SnackNotificationComponent implements OnInit {
  /**
   * Nombre del usuario actual
   */
  public userName: string;

  constructor(public snackBarRef: MatSnackBarRef<SnackNotificationComponent>, private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName;
    this.playAudio();
  }

  /**
   * Audio de la notificación
   */
  playAudio() {
    const audio = new Audio('../../../../assets/audio/notificacion.mp3');
    audio.play();
  }
}
