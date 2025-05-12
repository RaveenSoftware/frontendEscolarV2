import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poligrafo } from '../models/poligrafo.model';

@Injectable({
  providedIn: 'root',
})
export class PoligrafoService {
  private apiUrl = 'api/v1/poligrafos'; // URL del backend

  constructor(private http: HttpClient) {}

  list(): Observable<Poligrafo[]> {
    return this.http.get<Poligrafo[]>(this.apiUrl);
  }

  create(poligrafo: Poligrafo): Observable<Poligrafo> {
    console.log(poligrafo);
    this.mapRelatedIds(poligrafo);
    return this.http.post<Poligrafo>(this.apiUrl, poligrafo);
  }

  update(id: number, poligrafo: Poligrafo): Observable<Poligrafo> {
    this.mapRelatedIds(poligrafo);
    return this.http.put<Poligrafo>(`${this.apiUrl}/${id}`, poligrafo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapRelatedIds(poligrafo: Poligrafo): void {
    poligrafo.estudiante = { id: Number(poligrafo.estudianteId) };
    poligrafo.asignatura = { id: Number(poligrafo.asignaturaId) };
    poligrafo.nota = { id: Number(poligrafo.notaId) };
    poligrafo.semestreAcademico = { id: Number(poligrafo.semestreAcademicoId) };
  }
}
