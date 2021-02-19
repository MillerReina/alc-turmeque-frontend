import { Injectable, EventEmitter } from '@angular/core';
import { INewAssign } from '../../interfaces/assign-user-interface';

@Injectable({
  providedIn: 'root',
})
export class AssignUserDialogService {
  /**
   * Emisor de accion cuando crea
   */
  public newAssign: EventEmitter<INewAssign> = new EventEmitter<INewAssign>();

  constructor() {}
}
