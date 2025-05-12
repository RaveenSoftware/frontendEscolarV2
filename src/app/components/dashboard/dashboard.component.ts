import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface StatCard {
  icon: string;
  count: number;
  label: string;
  route: string; 
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>ADMINISTRADOR</h1>
      <p>Bienvenido a la sección principal</p>
      
      <div class="stats-grid">
        <div *ngFor="let stat of stats" class="stat-card" (click)="navigate(stat)">
          <i class="fas {{ stat.icon }}"></i>
          <div class="stat-info">
            <h3>{{ stat.count }}</h3>
            <p>{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer; /* Hacer toda la tarjeta clicable */
      transition: background-color 0.3s ease; /* Agregar transición */
    }
    .stat-card:hover {
      background-color: #f0f0f0; /* Efecto al hacer hover sobre la tarjeta */
    }
    .stat-card i {
      font-size: 2rem;
      color: #1a237e;
    }
    .stat-info h3 {
      margin: 0;
      font-size: 1.5rem;
      color: #1a237e;
    }
    .stat-info p {
      margin: 0.5rem 0 0;
      color: #666;
    }
  `]
})
export class DashboardComponent {
  stats: StatCard[] = [
    { icon: 'fa-user-graduate', count: 298, label: 'Gestionar Alumnos', route: '/students' },
    { icon: 'fa-book', count: 56, label: 'Gestionar Pensums', route: '/pensums' },
    { icon: 'fa-book-open', count: 56, label: 'Gestionar Asignaturas', route: '/asignaturas' },
    { icon: 'fa-calendar', count: 56, label: 'Gestionar Semestres Academicos', route: '/semestreAcademicos' },
    { icon: 'fa-chalkboard-teacher', count: 56, label: 'Gestionar Curso', route: '/cursos' },
    { icon: 'fa-chalkboard', count: 56, label: 'Gestionar Asesorias', route: '/asesorias' },
    { icon: 'fa-chalkboard-user', count: 43, label: 'Gestionar Docentes', route: '/teacher' },
    { icon: 'fa-venus-mars', count: 43, label: 'Gestionar Tipos Géneros', route: '/tipo-genero' },
    { icon: 'fa-id-card', count: 43, label: 'Gestionar Tipos Documentos', route: '/tipo-documento' },
    { icon: 'fa-building-columns', count: 43, label: 'Gestionar Facultades', route: '/facultad' },
    { icon: 'fa-person', count: 43, label: 'Gestionar Personas', route: '/persona' },
    { icon: 'fa-person', count: 43, label: 'Gestionar Aulas', route: '/aula' },
    { icon: 'fa-person', count: 43, label: 'Gestionar Horarios', route: '/horario' },
    { icon: 'fa-person', count: 50, label: 'Gestionar Horarios en Aulas', route: '/aula-horario' },
    { icon: 'fa-person', count: 50, label: 'Gestionar Notas', route: '/nota' },
    { icon: 'fa-person', count: 50, label: 'Gestionar Poligrafos', route: '/poligrafo' },
  ];
  
  

  constructor(private router: Router) {}

  // Método de navegación, redirige según la ruta asociada a cada tarjeta
  navigate(stat: StatCard) {
    this.router.navigate([stat.route]);
  }
}
