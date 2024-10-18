import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {  // Проверка, авторизован ли пользователь
      return true;  // Разрешить доступ
    } else {
      this.router.navigate(['/login']);  // Перенаправить на страницу логина
      return false;  // Запретить доступ
    }
  }
}
