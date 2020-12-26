import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginForm } from '../../interfaces/login-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /* Inicia sesion */
  login(formData: LoginForm): Observable<any> {
    return this.http.post<any>(`${base_url}/users/login`, formData);
  }
}
