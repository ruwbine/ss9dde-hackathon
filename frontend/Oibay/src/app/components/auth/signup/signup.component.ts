import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthResponse } from './interface';
 // Импортируем интерфейс

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Инициализация формы с валидацией
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]], // Имя пользователя обязательно и минимум 3 символа
      email: ['', [Validators.required, Validators.email]], // Обязательное поле и проверка на формат email
      password: ['', [Validators.required, Validators.minLength(6)]] // Обязательное поле и минимальная длина 6 символов
    });
  }

  get username() {
    return this.registerForm.get('username'); // Получаем поле username
  }

  get email() {
    return this.registerForm.get('email'); // Получаем поле email
  }

  get password() {
    return this.registerForm.get('password'); // Получаем поле password
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;

      // Регистрация пользователя
      // this.authService.register(username, email, password).subscribe({
      //   next: (response: AuthResponse) => { // Указываем тип ответа
      //     // Предполагаем, что ответ имеет структуру { success: true, data: [{ accessToken: token }] }
      //     // if (response.success && response.data.length > 0) {
      //     //   const token = response.data[0].accessToken; // Извлекаем токен
      //     //   console.log('Регистрация прошла успешно:', response);
      //     //   this.authService.saveToken(token); // Сохраняем токен
      //     //   // Дополнительные действия при успешной регистрации, например, перенаправление
      //     // } else {
      //     //   alert('Ошибка регистрации: Неверный ответ от сервера.');
      //     // }
      //   },
    //     error: (error: { message: string }) => {
    //       const errorMessage = error.message || 'Неизвестная ошибка';
    //       console.error('Ошибка регистрации:', errorMessage);
    //       alert(`Ошибка: ${errorMessage}`);
    //     }
    //   });
    // } else {
    //   alert('Пожалуйста, исправьте ошибки в форме.');
    // }
   }
  }
}
