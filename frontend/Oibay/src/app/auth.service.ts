// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';  
  constructor(private http: HttpClient) {}

  // Проверка авторизации
  async register(username: string, email: string, password: string): Promise<any> {
    const payload = {
      username: username,
      email: email,
      password: password
    };

    const response = await fetch(`${this.apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Ошибка при регистрации: ' + response.statusText);
    }

    return response.json();
  }

  // Вход пользователя
  async login(email: string, password: string): Promise<any> {
    const payload = {
      email: email,
      password: password
    };

    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Ошибка при входе: ' + response.statusText);
    }

    return response.json();
  }

  // Логика сохранения токена при входе
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Получение токена
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Проверка авторизации
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Выход пользователя
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
