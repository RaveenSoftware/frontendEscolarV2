import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <ng-container *ngIf="!isLoginRoute; else loginOnly">
      <div class="app-container">
        <app-sidebar (sidebarCollapsed)="onSidebarCollapse($event === true)"></app-sidebar>
        <div class="main-content" [class.collapsed]="isSidebarCollapsed">
          <app-header></app-header>
          <router-outlet></router-outlet>
        </div>
      </div>
    </ng-container>

    <ng-template #loginOnly>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .app-container {
      display: flex;
      min-height: 100vh;
    }
    .main-content {
      flex: 1;
      margin-left: 280px;
      background: #f8f9fa;
      transition: margin-left 0.3s ease;
      
      &.collapsed {
        margin-left: 80px;
      }
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
        
        &.collapsed {
          margin-left: 0;
        }
      }
    }
  `],
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  isLoginRoute = false;
  isSidebarCollapsed = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe((status) => {
      this.isAuthenticated = status;
    });

    this.router.events.subscribe(() => {
      this.isLoginRoute = this.router.url === '/login';
    });
  }

  onSidebarCollapse(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}