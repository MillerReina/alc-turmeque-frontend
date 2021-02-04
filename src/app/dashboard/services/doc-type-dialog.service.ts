import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocTypeDialogService {
  /**
   * Emisor de accion cuando crea
   */
  public newDocType: EventEmitter<string> = new EventEmitter<string>();
  /**
   * Emisor de accion cuando actualiza
   */
  public updateDocType: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}
}
