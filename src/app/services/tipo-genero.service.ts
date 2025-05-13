import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoGenero } from '../models/tipo-genero.model';

@Injectable({
  providedIn: 'root'
})
export class TipoGeneroService {
  private apiUrl = 'api/v1/tipo-generos';

  constructor(private http: HttpClient) {}

  list(): Observable<TipoGenero[]> {
    return this.http.get<TipoGenero[]>(this.apiUrl);
  }

  get(id: number): Observable<TipoGenero> {
    return this.http.get<TipoGenero>(`${this.apiUrl}/${id}`);
  }

  create(tipoGenero: TipoGenero): Observable<TipoGenero> {
    // Remove undefined properties before sending
    const cleanData = {
      nombre: tipoGenero.nombre,
      estado: tipoGenero.estado ?? true
    };
    return this.http.post<TipoGenero>(this.apiUrl, cleanData);
  }

  update(id: number, tipoGenero: TipoGenero): Observable<TipoGenero> {
    // Remove undefined properties before sending
    const cleanData = {
      nombre: tipoGenero.nombre,
      estado: tipoGenero.estado ?? true
    };
    return this.http.put<TipoGenero>(`${this.apiUrl}/${id}`, cleanData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}