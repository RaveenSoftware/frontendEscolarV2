
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from '../models/horario.model';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private http = inject(HttpClient);
  private apiUrl = 'api/v1/horarios';

  list(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl);
  }

  get(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/${id}`);
  }

  create(horario: Partial<Horario>): Observable<Horario> {
    return this.http.post<Horario>(this.apiUrl, horario);
  }

  update(id: number, horario: Partial<Horario>): Observable<Horario> {
    return this.http.put<Horario>(`${this.apiUrl}/${id}`, horario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
