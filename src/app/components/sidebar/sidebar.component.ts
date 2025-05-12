import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar-container" [class.collapsed]="isCollapsed">
      <aside class="sidebar" [class.collapsed]="isCollapsed">
        <div class="sidebar-header">
          <div class="logo">
            <img src="assets/logoudes.png" alt="Logo" class="logo-img">
            <span class="logo-text" *ngIf="!isCollapsed">GEMINIS</span>
          </div>
          <button class="collapse-btn" (click)="toggleSidebar()">
            <i class="fas" [class.fa-chevron-left]="!isCollapsed" [class.fa-chevron-right]="isCollapsed"></i>
          </button>
        </div>

        <div class="menu-section">
          <a [routerLink]="'/admin-dashboard'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-home"></i>
            <span *ngIf="!isCollapsed">Inicio</span>
          </a>

          <div class="section-title" *ngIf="!isCollapsed">ACADÉMICO</div>
          <a [routerLink]="'/students'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-user-graduate"></i>
            <span *ngIf="!isCollapsed">Estudiantes</span>
          </a>
          <a [routerLink]="'/teacher'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-chalkboard-teacher"></i>
            <span *ngIf="!isCollapsed">Docentes</span>
          </a>
          <a [routerLink]="'/cursos'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-book"></i>
            <span *ngIf="!isCollapsed">Cursos</span>
          </a>
          <a [routerLink]="'/asesorias'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-chalkboard"></i>
            <span *ngIf="!isCollapsed">Asesorías</span>
          </a>
          <a [routerLink]="'/nota'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-star"></i>
            <span *ngIf="!isCollapsed">Calificaciones</span>
          </a>

          <div class="section-title" *ngIf="!isCollapsed">ADMINISTRATIVO</div>
          <a [routerLink]="'/facultad'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-building-columns"></i>
            <span *ngIf="!isCollapsed">Facultades</span>
          </a>
          <a [routerLink]="'/pensums'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-scroll"></i>
            <span *ngIf="!isCollapsed">Planes de Estudio</span>
          </a>
          <a [routerLink]="'/aula'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-door-open"></i>
            <span *ngIf="!isCollapsed">Aulas</span>
          </a>
          <a [routerLink]="'/horario'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-calendar"></i>
            <span *ngIf="!isCollapsed">Horarios</span>
          </a>

          <div class="section-title" *ngIf="!isCollapsed">CONFIGURACIÓN</div>
          <a [routerLink]="'/tipo-genero'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-venus-mars"></i>
            <span *ngIf="!isCollapsed">Tipos de Género</span>
          </a>
          <a [routerLink]="'/tipo-documento'" routerLinkActive="active" class="menu-item">
            <i class="fas fa-id-card"></i>
            <span *ngIf="!isCollapsed">Tipos de Documento</span>
          </a>
        </div>

        <div class="user-profile" *ngIf="!isCollapsed">
          <img src="https://ui-avatars.com/api/?name=Admin&background=1a237e&color=fff" alt="Usuario" class="avatar">
          <div class="user-info">
            <h3>Usuario Admin</h3>
            <span class="role">Administrador</span>
          </div>
        </div>
      </aside>
    </div>
  `,
  styles: [`
    .sidebar-container {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index: 1000;
      transition: width 0.3s ease;
      width: 280px;
      
      &.collapsed {
        width: 80px;
      }
    }

    .sidebar {
      width: 100%;
      height: 100vh;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-right: 1px solid rgba(224, 224, 224, 0.5);
      display: flex;
      flex-direction: column;
      padding: 1.5rem 1rem;
      position: relative;
      overflow-y: auto;
      transition: all 0.3s ease;

      &.collapsed {
        .logo-img {
          margin: 0 auto;
        }
        
        .menu-item {
          justify-content: center;
          
          i {
            margin: 0;
          }
        }
      }
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(224, 224, 224, 0.5);
      margin-bottom: 1.5rem;
    }

    .collapse-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #f1f5f9;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #e2e8f0;
      }

      i {
        font-size: 0.75rem;
        color: #64748b;
      }
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
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

      i {
        font-size: 1.25rem;
        width: 1.5rem;
        text-align: center;
      }

      &:hover {
        background: rgba(241, 245, 249, 0.8);
        color: #1a237e;
      }

      &.active {
        background: rgba(232, 234, 246, 0.8);
        color: #1a237e;
        font-weight: 500;
      }
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      margin-top: 2rem;
      border-top: 1px solid rgba(224, 224, 224, 0.5);
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .user-info {
      flex: 1;

      h3 {
        font-size: 0.875rem;
        font-weight: 600;
        color: #1e293b;
        margin: 0;
      }

      .role {
        font-size: 0.75rem;
        color: #64748b;
      }
    }

    @media (max-width: 768px) {
      .sidebar-container {
        width: 0;
        
        &.collapsed {
          width: 0;
        }
      }
    }
  `]
})
export class SidebarComponent {
  @Output() sidebarCollapsed = new EventEmitter<boolean>();
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarCollapsed.emit(this.isCollapsed);
  }
}