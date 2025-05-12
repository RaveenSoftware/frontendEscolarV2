import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nota } from '../models/nota.model';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private apiUrl = 'api/v1/notas'; // URL del backend

  constructor(private http: HttpClient) {}

  list(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.apiUrl);
  }

  create(nota: Nota): Observable<Nota> {
    this.consultarLosId(nota);
    return this.http.post<Nota>(this.apiUrl, nota);
  }

  update(id: number, nota: Nota): Observable<Nota> {
    this.consultarLosId(nota);
    return this.http.put<Nota>(`${this.apiUrl}/${id}`, nota);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private consultarLosId(nota: Nota): void {
    nota.curso = { id: Number(nota.cursoId) };
  }
}
