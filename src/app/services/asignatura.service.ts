import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Asignatura } from '../models/asignatura.model';

@Injectable({
  providedIn: 'root',
})
export class AsignaturaService {
  private apiUrl = 'api/v1/asignaturas';

  constructor(private http: HttpClient) { }

  list(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  get(id: number): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(asignatura: Asignatura): Observable<Asignatura> {
    this.consultarLosId(asignatura);
    this.consultarLosIdPensum(asignatura);
    return this.http.post<Asignatura>(this.apiUrl, asignatura).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, asignatura: Asignatura): Observable<Asignatura> {
    this.consultarLosId(asignatura);
    this.consultarLosIdPensum(asignatura);
    return this.http.put<Asignatura>(`${this.apiUrl}/${id}`, asignatura).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private consultarLosId(asignatura: Asignatura): void {
    if (asignatura.predecesoraId) {
      asignatura.predecesora = { id: Number(asignatura.predecesoraId) };
    }
  }
 

  private consultarLosIdPensum(asignatura: Asignatura): void {
    if (asignatura.pensumId) {
      asignatura.pensum = { id: Number(asignatura.pensumId) };
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error al cargar las asignaturas', error);
    return throwError(() => new Error('Error al cargar las asignaturas'));
  }
}