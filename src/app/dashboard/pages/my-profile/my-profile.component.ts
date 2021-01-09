import { Component, OnInit } from '@angular/core';
import { IOfficer } from '../../../interfaces/registered-officers.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  /**
   * Estado anterior a carga
   */
  public preload: boolean;
  /**
   * Información personal del perfil autenticado
   */
  public actualUser: IOfficer;

  constructor(private userService: UsersService) {
    this.preload = true;
  }

  ngOnInit(): void {
    this.getMyDetails();
  }
  /**
   * Obtiene los detalles del usuario logueado
   */
  getMyDetails(): void {
    this.userService.getMyDetails().subscribe((res) => {
      this.actualUser = res.user;
      this.preload = false;
    });
  }
}
