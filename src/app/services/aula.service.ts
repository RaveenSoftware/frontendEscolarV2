import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Aula } from '../models/aula.model';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  private http = inject(HttpClient);
  private baseUrl = 'api/v1/aulas';

  list(): Observable<Aula[]> {
    return this.http.get<Aula[]>(this.baseUrl);
  }

  get(id: number): Observable<Aula> {
    return this.http.get<Aula>(`${this.baseUrl}/${id}`);
  }

  create(aula: Aula): Observable<Aula> {
    return this.http.post<Aula>(this.baseUrl, aula);
  }

  update(id: number, aula: Aula): Observable<Aula> {
    return this.http.put<Aula>(`${this.baseUrl}/${id}`, aula);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
