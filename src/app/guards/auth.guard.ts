import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/* Servicios */
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.validateToken().pipe(
      tap(
        (isAuth) => {
          if (!isAuth) {
            this.router.navigateByUrl('/login');
          }
        },
        (__) => {
          this.authService.logout();
        }
      )
    );
  }

  canLoad(): Observable<boolean> {
    return this.authService.validateToken().pipe(
      tap(
        (isAuth) => {
          if (!isAuth) {
            this.router.navigateByUrl('/login');
          }
        },
        (__) => {
          this.authService.logout();
        }
      )
    );
  }
}
