// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expected = route.data['expectedRole'];
    const role = this.auth.getRole();

    if (expected === 'admin' && (role === 'admin' || role === 'provider')) return true;
    if (expected === 'patient' && role === 'patient') return true;

    this.router.navigate(['/login']);
    return false;
  }
}
