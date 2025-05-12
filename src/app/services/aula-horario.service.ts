import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AulaHorario } from '../models/aula-horario.model';

@Injectable({
  providedIn: 'root',
})
export class AulaHorarioService {

  private apiUrl = 'api/v1/aulaHorarios';

  constructor(private http: HttpClient) {}

  list(): Observable<AulaHorario[]> {
    return this.http.get<AulaHorario[]>(this.apiUrl);
  }

  create(aulaHorario: AulaHorario): Observable<AulaHorario> {
    this.mapIds(aulaHorario);
    return this.http.post<AulaHorario>(this.apiUrl, aulaHorario);
  }

  update(id: number, aulaHorario: AulaHorario): Observable<AulaHorario> {
    this.mapIds(aulaHorario);
    return this.http.put<AulaHorario>(`${this.apiUrl}/${id}`, aulaHorario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapIds(aulaHorario: AulaHorario): void {
    aulaHorario.aula = { id: Number(aulaHorario.aulaId) };
    aulaHorario.horario = { id: Number(aulaHorario.horarioId) };
    aulaHorario.curso = { id: Number(aulaHorario.cursoId) };
    
  }
}
