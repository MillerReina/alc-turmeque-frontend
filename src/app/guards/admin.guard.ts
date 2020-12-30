import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let value = false;
    this.authService.getRole.forEach((element: any) => {
      if (element.name === 'Administrador') {
        value = true;
      } else {
        this.router.navigateByUrl('/dashboard');
        value = false;
      }
    });
    return value;
  }
}