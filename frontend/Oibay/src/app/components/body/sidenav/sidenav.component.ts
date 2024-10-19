import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidenav',
  standalone:true,
  templateUrl: './sidenav.component.html',
  imports:[CommonModule,RouterLink,MatButtonModule],
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() isLeftSidebarCollapsed: boolean = false; // Параметр для состояния сайдбара
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>(); // Событие для изменения состояния

  items = [
    { routeLink: 'home', icon: 'fa-solid fa-house', label: 'Home' },
    { routeLink: 'history', icon: 'fa-solid fa-clock-rotate-left', label: 'History' },
    { routeLink: 'account', icon: 'fa-solid fa-user', label: 'User' },
    { routeLink: 'settings', icon: 'fa-solid fa-gear', label: 'Settings' }
  ];

  toggleCollapse(): void {
    this.isLeftSidebarCollapsed = !this.isLeftSidebarCollapsed;
    this.changeIsLeftSidebarCollapsed.emit(this.isLeftSidebarCollapsed);
  }
}
