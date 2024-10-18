import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service' 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[RouterModule,ReactiveFormsModule,CommonModule],
  standalone: true,
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Обязательное поле и проверка на формат email
      password: ['', [Validators.required, Validators.minLength(6)]] // Обязательное поле и минимальная длина 6 символов
    });
  }

  get email() {
    return this.loginForm.get('email'); // Получаем поле email
  }

  get password() {
    return this.loginForm.get('password'); // Получаем поле password
  }

  async onLogin() {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        const response = await this.authService.login(email, password);
        console.log('Вход прошел успешно:', response);
        this.authService.saveToken(response.token);
        // Перенаправление на главную страницу
      } catch (error: unknown) {
        const errorMessage = (error as Error).message || 'Неизвестная ошибка';
        console.error('Ошибка входа:', errorMessage);
        alert(`Ошибка: ${errorMessage}`);
      }
    } else {
      alert('Пожалуйста, исправьте ошибки в форме.');
    }
  }
  
}
