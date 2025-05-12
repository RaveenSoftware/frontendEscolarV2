import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h1>👋 ¡Bienvenido, Administrador!</h1>
        <p class="subtitle">Comienza a gestionar tu plataforma educativa</p>
        
        <div class="quick-actions">
          <div class="action-card">
            <h3>Guía de Inicio Rápido</h3>
            <p>Aprende a gestionar tu plataforma educativa de manera efectiva</p>
            <button class="action-button">Aprende Más →</button>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="section">
          <div class="section-header">
            <h2>Gestión Académica</h2>
            <button class="view-all">Ver todo</button>
          </div>
          <div class="cards-grid">
            <div class="dashboard-card" (click)="navigate('/students')">
              <div class="card-icon student-icon">
                <i class="fas fa-user-graduate"></i>
              </div>
              <div class="card-content">
                <h3>Estudiantes</h3>
                <p>298 Estudiantes Activos</p>
              </div>
            </div>
            
            <div class="dashboard-card" (click)="navigate('/teacher')">
              <div class="card-icon teacher-icon">
                <i class="fas fa-chalkboard-teacher"></i>
              </div>
              <div class="card-content">
                <h3>Docentes</h3>
                <p>43 Miembros de Facultad</p>
              </div>
            </div>

            <div class="dashboard-card" (click)="navigate('/cursos')">
              <div class="card-icon course-icon">
                <i class="fas fa-book"></i>
              </div>
              <div class="card-content">
                <h3>Cursos</h3>
                <p>56 Cursos Activos</p>
              </div>
            </div>

            <div class="dashboard-card" (click)="navigate('/asesorias')">
              <div class="card-icon advisory-icon">
                <i class="fas fa-chalkboard"></i>
              </div>
              <div class="card-content">
                <h3>Asesorías</h3>
                <p>24 Sesiones Programadas</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <h2>Administrativo</h2>
            <button class="view-all">Ver todo</button>
          </div>
          <div class="cards-grid">
            <div class="dashboard-card" (click)="navigate('/facultad')">
              <div class="card-icon faculty-icon">
                <i class="fas fa-building-columns"></i>
              </div>
              <div class="card-content">
                <h3>Facultades</h3>
                <p>6 Facultades Activas</p>
              </div>
            </div>

            <div class="dashboard-card" (click)="navigate('/pensums')">
              <div class="card-icon pensum-icon">
                <i class="fas fa-scroll"></i>
              </div>
              <div class="card-content">
                <h3>Planes de Estudio</h3>
                <p>12 Programas Activos</p>
              </div>
            </div>

            <div class="dashboard-card" (click)="navigate('/aula')">
              <div class="card-icon classroom-icon">
                <i class="fas fa-door-open"></i>
              </div>
              <div class="card-content">
                <h3>Aulas</h3>
                <p>32 Salones Disponibles</p>
              </div>
            </div>

            <div class="dashboard-card" (click)="navigate('/horario')">
              <div class="card-icon schedule-icon">
                <i class="fas fa-calendar"></i>
              </div>
              <div class="card-content">
                <h3>Horarios</h3>
                <p>Periodo Actual</p>
              </div>
            </div>

            <div class="dashboard-card" (click)="navigate('/roles')">
              <div class="card-icon role-icon">
                <i class="fas fa-user-shield"></i>
              </div>
              <div class="card-content">
                <h3>Gestionar Roles</h3>
                <p>3 Roles Configurados</p>
              </div>
            </div>

            <div class="dashboard-card" (click)="navigate('/programas')">
              <div class="card-icon program-icon">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <div class="card-content">
                <h3>Programas Académicos</h3>
                <p>8 Programas Activos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      background: #f8f9fa;
      min-height: 100vh;
    }

    .welcome-section {
      margin-bottom: 2rem;
    }

    .welcome-section h1 {
      font-size: 2rem;
      color: #1a237e;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #6c757d;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .quick-actions {
      margin-top: 2rem;
    }

    .action-card {
      background: linear-gradient(135deg, #1a237e 0%, #303f9f 100%);
      color: white;
      padding: 2rem;
      border-radius: 1rem;
      max-width: 400px;
    }

    .action-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .action-button {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .action-button:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .section {
      margin-bottom: 2rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-header h2 {
      color: #1a237e;
      font-size: 1.5rem;
    }

    .view-all {
      color: #1a237e;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .dashboard-card {
      background: white;
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid #e9ecef;
    }

    .dashboard-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
    }

    .student-icon { background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%); }
    .teacher-icon { background: linear-gradient(135deg, #1976D2 0%, #0D47A1 100%); }
    .course-icon { background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%); }
    .advisory-icon { background: linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%); }
    .faculty-icon { background: linear-gradient(135deg, #E91E63 0%, #C2185B 100%); }
    .pensum-icon { background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%); }
    .classroom-icon { background: linear-gradient(135deg, #3F51B5 0%, #283593 100%); }
    .schedule-icon { background: linear-gradient(135deg, #009688 0%, #00796B 100%); }
    .role-icon { background: linear-gradient(135deg, #795548 0%, #4E342E 100%); }
    .program-icon { background: linear-gradient(135deg, #FF5722 0%, #F4511E 100%); }

    .card-content {
      flex: 1;
    }

    .card-content h3 {
      color: #2c3e50;
      margin-bottom: 0.25rem;
      font-size: 1.1rem;
    }

    .card-content p {
      color: #6c757d;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .cards-grid {
        grid-template-columns: 1fr;
      }

      .welcome-section h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class DashboardComponent {
  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }
}