import { Component, input, computed, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, CommonModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Input() isLeftSidebarCollapsed!: boolean;  // Используйте ! для указания, что значение будет передано
  @Input() screenWidth!: number;                // Используйте ! для указания, что значение будет передано
  sizeClass = computed(() => {
    const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed;
    if (isLeftSidebarCollapsed) {
      return '';
    }
    return this.screenWidth > 768 ? 'body-trimmed' : 'body-md-screen';
  });
}
