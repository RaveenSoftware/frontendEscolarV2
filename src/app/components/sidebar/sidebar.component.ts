import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  path: string;
  icon: string;
  label: string;
  section?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="logo">
        <img src="assets/logoudes.png" alt="Logo" class="logo-img">
        <span class="logo-text">GEMINIS</span>
      </div>

      <div class="menu-section">
        <a [routerLink]="'/admin-dashboard'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-home"></i>
          <span>Dashboard</span>
        </a>

        <div class="section-title">ACADEMIC</div>
        <a [routerLink]="'/students'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-user-graduate"></i>
          <span>Students</span>
        </a>
        <a [routerLink]="'/teacher'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-chalkboard-teacher"></i>
          <span>Teachers</span>
        </a>
        <a [routerLink]="'/cursos'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-book"></i>
          <span>Courses</span>
        </a>
        <a [routerLink]="'/asesorias'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-chalkboard"></i>
          <span>Advisories</span>
        </a>
        <a [routerLink]="'/nota'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-star"></i>
          <span>Grades</span>
        </a>

        <div class="section-title">ADMINISTRATIVE</div>
        <a [routerLink]="'/facultad'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-building-columns"></i>
          <span>Faculties</span>
        </a>
        <a [routerLink]="'/pensums'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-scroll"></i>
          <span>Pensums</span>
        </a>
        <a [routerLink]="'/aula'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-door-open"></i>
          <span>Classrooms</span>
        </a>
        <a [routerLink]="'/horario'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-calendar"></i>
          <span>Schedules</span>
        </a>

        <div class="section-title">SETTINGS</div>
        <a [routerLink]="'/tipo-genero'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-venus-mars"></i>
          <span>Gender Types</span>
        </a>
        <a [routerLink]="'/tipo-documento'" routerLinkActive="active" class="menu-item">
          <i class="fas fa-id-card"></i>
          <span>Document Types</span>
        </a>
      </div>

      <div class="user-profile">
        <img src="https://ui-avatars.com/api/?name=Admin&background=1a237e&color=fff" alt="User" class="avatar">
        <div class="user-info">
          <h3>Admin User</h3>
          <span class="role">Administrator</span>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: 100vh;
      background: white;
      border-right: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      position: fixed;
      overflow-y: auto;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 1.5rem;
    }

    .logo-img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a237e;
    }

    .menu-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: #94a3b8;
      margin: 1.5rem 0 0.75rem 0.75rem;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      color: #64748b;
      text-decoration: none;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
    }

    .menu-item i {
      font-size: 1.25rem;
      width: 1.5rem;
      text-align: center;
    }

    .menu-item:hover {
      background: #f1f5f9;
      color: #1a237e;
    }

    .menu-item.active {
      background: #e8eaf6;
      color: #1a237e;
      font-weight: 500;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      margin-top: 2rem;
      border-top: 1px solid #e0e0e0;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .user-info {
      flex: 1;
    }

    .user-info h3 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .role {
      font-size: 0.75rem;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 0;
        padding: 0;
        overflow: hidden;
      }
    }
  `]
})
export class SidebarComponent {
  constructor() {}
}