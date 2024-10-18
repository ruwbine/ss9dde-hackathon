import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  constructor(private authService: AuthService, private router: Router) {}
  username: string = '';
  email: string = '';
  password: string = '';
  async onRegister() {
    try {
      const response = await this.authService.register(this.username, this.email, this.password);
      console.log('Регистрация прошла успешно:', response);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  }
}
