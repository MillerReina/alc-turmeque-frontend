import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DependecyDialogService {
  /**
   * Emisor de accion cuando crea
   */
  public newDependecy: EventEmitter<string> = new EventEmitter<string>();
  /**
   * Emisor de accion cuando actualiza
   */
  public updateDependecy: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}
}
