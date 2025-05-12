// src/app/services/curso.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'api/v1/cursos';

  constructor(private http: HttpClient) {}

  list(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  get(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(curso: Curso): Observable<Curso> {
    this.consultarLosId(curso);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Curso>(this.apiUrl, curso, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, curso: Curso): Observable<Curso> {
    this.consultarLosId(curso);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private consultarLosId(curso: Curso): void {
    curso.docente = { id: Number(curso.docenteId) };
    curso.asignatura = { id: Number(curso.asignaturaId) };
    curso.semestreAcademico = { id: Number(curso.semestreAcademicoId) };
    //curso.aulaHorario = { id: Number(curso.aulaHorarioId) };
    //curso.programaAcademico = { id: Number(curso.programaAcademico.id) };
    //curso.matriculaAcademica = { id: Number(curso.matriculaAcademicoId) };
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error al cargar los cursos', error);
    return throwError(() => new Error('Error al cargar los cursos'));
  }
}