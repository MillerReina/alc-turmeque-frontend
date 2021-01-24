import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}

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

  userExists(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      if (control.value === 'Dementor') {
        resolve({ existe: true });
      } else {
        resolve(null);
      }
    });
  }
}
