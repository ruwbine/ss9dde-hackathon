import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private authService: AuthService, private router: Router) { }
  private sidebarState = new BehaviorSubject<boolean>(false);
  
  // Observable для подписки на состояние сайдбара
  public sidebarState$ = this.sidebarState.asObservable();

  // Метод для изменения состояния сайдбара
  toggleSidebar() {
    const currentState = this.sidebarState.getValue();
    this.sidebarState.next(!currentState);
  }
}
