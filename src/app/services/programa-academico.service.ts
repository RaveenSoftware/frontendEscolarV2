import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProgramaAcademico } from '../models/programa-academico.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramaAcademicoService {
  private apiUrl = 'api/v1/programas';
  
  // Mock data for local development
  private mockProgramas: ProgramaAcademico[] = [
    {
      id: 1,
      codigoPrograma: 'ING-SIS',
      nombrePrograma: 'Ingeniería de Sistemas',
      descripcion: 'Programa de Ingeniería de Sistemas',
      estado: true,
      facultadId: 1,
      creditosPrograma: 170
    },
    {
      id: 2,
      codigoPrograma: 'ING-IND',
      nombrePrograma: 'Ingeniería Industrial',
      descripcion: 'Programa de Ingeniería Industrial',
      estado: true,
      facultadId: 1,
      creditosPrograma: 165
    }
  ];

  constructor(private http: HttpClient) {}

  list(): Observable<ProgramaAcademico[]> {
    return of(this.mockProgramas);
  }

  get(id: number): Observable<ProgramaAcademico> {
    const programa = this.mockProgramas.find(p => p.id === id);
    return of(programa as ProgramaAcademico);
  }

  create(programa: ProgramaAcademico): Observable<ProgramaAcademico> {
    const newPrograma = {
      ...programa,
      id: this.mockProgramas.length + 1
    };
    this.mockProgramas.push(newPrograma);
    return of(newPrograma);
  }

  update(id: number, programa: ProgramaAcademico): Observable<ProgramaAcademico> {
    const index = this.mockProgramas.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProgramas[index] = { ...this.mockProgramas[index], ...programa };
      return of(this.mockProgramas[index]);
    }
    return of({} as ProgramaAcademico);
  }

  delete(id: number): Observable<void> {
    const index = this.mockProgramas.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProgramas.splice(index, 1);
    }
    return of(void 0);
  }
}