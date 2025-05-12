import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pensum } from '../models/pensum.model';

@Injectable({
  providedIn: 'root',
})
export class PensumService {
  private apiUrl = 'api/v1/pensums';

  constructor(private http: HttpClient) {}

  list(): Observable<Pensum[]> {
    return this.http.get<Pensum[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  get(id: number): Observable<Pensum> {
    return this.http.get<Pensum>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(pensum: Pensum): Observable<Pensum> {
    this.mapAsignaturas(pensum);
    return this.http.post<Pensum>(this.apiUrl, pensum).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, pensum: Pensum): Observable<Pensum> {
    this.mapAsignaturas(pensum);
    return this.http.put<Pensum>(`${this.apiUrl}/${id}`, pensum).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private mapAsignaturas(pensum: Pensum): void {
    if (pensum.asignaturas) {
      pensum.asignaturas = pensum.asignaturas.map(asignatura => ({
        id: Number(asignatura.id),
        nombre: asignatura.nombre,
        codigo: asignatura.codigo,
        predecesora: asignatura.predecesora,
        numeroSemestre: asignatura.numeroSemestre,
        numeroCreditos: asignatura.numeroCreditos,
        pensum: { id: Number(asignatura.pensum?.id) }
      }));
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error al cargar PENSUM', error);
    return throwError(() => new Error('Error al cargar los pensums'));
  }
}