import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SemestreAcademico } from '../models/semestre-academico.model';

@Injectable({
  providedIn: 'root',
})
export class SemestreAcademicoService {
  private apiUrl = 'api/v1/semestreAcademicos';

  constructor(private http: HttpClient) {}

  list(): Observable<SemestreAcademico[]> {
    return this.http.get<SemestreAcademico[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  get(id: number): Observable<SemestreAcademico> {
    return this.http.get<SemestreAcademico>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(semestreAcademico: SemestreAcademico): Observable<SemestreAcademico> {
    return this.http.post<SemestreAcademico>(this.apiUrl, semestreAcademico).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, semestreAcademico: SemestreAcademico): Observable<SemestreAcademico> {
    return this.http.put<SemestreAcademico>(`${this.apiUrl}/${id}`, semestreAcademico).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error al cargar los semestres académicos', error);
    return throwError(() => new Error('Error al cargar los semestres académicos'));
  }
}