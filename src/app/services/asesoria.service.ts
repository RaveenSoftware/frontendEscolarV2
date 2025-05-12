// src/app/services/asesoria.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Asesoria } from '../models/asesoria.model';

@Injectable({
  providedIn: 'root',
})
export class AsesoriaService {
  private apiUrl = 'api/v1/asesorias';

  constructor(private http: HttpClient) {}

  list(): Observable<Asesoria[]> {
    return this.http.get<Asesoria[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  get(id: number): Observable<Asesoria> {
    return this.http.get<Asesoria>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(asesoria: Asesoria): Observable<Asesoria> {
    this.consultarLosId(asesoria);
    return this.http.post<Asesoria>(this.apiUrl, asesoria).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, asesoria: Asesoria): Observable<Asesoria> {
    this.consultarLosId(asesoria);
    return this.http.put<Asesoria>(`${this.apiUrl}/${id}`, asesoria).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private consultarLosId(asesoria: Asesoria): void {
    asesoria.docente = { id: Number(asesoria.docenteId) };
    asesoria.curso = { id: Number(asesoria.cursoId) };
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error al cargar las asesorías', error);
    return throwError(() => new Error('Error al cargar las asesorías'));
  }
}