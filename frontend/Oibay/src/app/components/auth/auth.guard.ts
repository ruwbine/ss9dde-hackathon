// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {  // Проверка, авторизован ли пользователь
      return true;  // Разрешить доступ
    } else {
      this.router.navigate(['/login']);  // Перенаправить на страницу логина
      return false;  // Запретить доступ
    }
  }
}
