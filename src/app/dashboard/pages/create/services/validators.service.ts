import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

interface ErrorValidate {
  [s: string]: boolean;
}

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  /* Obtiene el token del usuario */
  get getToken(): string {
    return localStorage.getItem('tkn-user') || '';
  }
  /* Obtiene los headers para solicitudes http */
  get getHeaders() {
    return {
      headers: {
        Authorization: `Token ${this.getToken}`,
      },
    };
  }

  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true,
      };
    }
    return null;
  }

  passwordIsInvalid(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ isntsame: true });
      }
    };
  }

  getMyDetails(): Observable<any> {
    return this.http.get<any>(`${base_url}/users/user`, this.getHeaders);
  }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      this.getMyDetails().subscribe((res) => {
        console.log(res);
      });
      if (control.value === 'Dementor') {
        resolve({ existe: true });
      } else {
        resolve(null);
      }
    });
  }
}
