import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  /**
   * Atributo para la instancia del socket
   */
  public socket: WebSocket;
  constructor() {}

  /**
   * Obtiene las notificaciones por medio del usuario actual conectado
   */
  getMessages = (id) => {
    this.socket = new WebSocket(`${environment.ws_url}/${id}`);
    return new Observable((obs) => {
      this.socket.onmessage = (e) => obs.next(e.data);
      this.socket.onerror = (e) => obs.error(e);
      this.socket.onclose = (_) => obs.complete();
      return () => this.socket.close(3000, 'Usuario desconectado');
    });
  };

  /**
   * Cierra el socket
   */
  closeSocket() {
    this.socket.close();
  }
}
