import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = 'api/v1/roles';
  
  // Mock data for local development
  private mockRoles: Rol[] = [
    { id: 1, nombre: 'Administrador', descripcion: 'Control total del sistema' },
    { id: 2, nombre: 'Docente', descripcion: 'Gestión de cursos y calificaciones' },
    { id: 3, nombre: 'Estudiante', descripcion: 'Acceso a recursos académicos' }
  ];

  constructor(private http: HttpClient) {}

  list(): Observable<Rol[]> {
    return of(this.mockRoles);
  }

  get(id: number): Observable<Rol> {
    const rol = this.mockRoles.find(r => r.id === id);
    return of(rol as Rol);
  }

  create(rol: Rol): Observable<Rol> {
    const newRol = {
      ...rol,
      id: this.mockRoles.length + 1
    };
    this.mockRoles.push(newRol);
    return of(newRol);
  }

  update(id: number, rol: Rol): Observable<Rol> {
    const index = this.mockRoles.findIndex(r => r.id === id);
    if (index !== -1) {
      this.mockRoles[index] = { ...this.mockRoles[index], ...rol };
      return of(this.mockRoles[index]);
    }
    return of({} as Rol);
  }

  delete(id: number): Observable<void> {
    const index = this.mockRoles.findIndex(r => r.id === id);
    if (index !== -1) {
      this.mockRoles.splice(index, 1);
    }
    return of(void 0);
  }
}