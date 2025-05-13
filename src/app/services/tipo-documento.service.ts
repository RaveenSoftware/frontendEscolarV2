import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../models/tipo-documento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private apiUrl = 'api/v1/tipo-documentos';

  constructor(private http: HttpClient) {}

  list(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(this.apiUrl);
  }

  get(id: number): Observable<TipoDocumento> {
    return this.http.get<TipoDocumento>(`${this.apiUrl}/${id}`);
  }

  create(tipoDocumento: TipoDocumento): Observable<TipoDocumento> {
    return this.http.post<TipoDocumento>(this.apiUrl, tipoDocumento);
  }

  update(id: number, tipoDocumento: TipoDocumento): Observable<TipoDocumento> {
    return this.http.put<TipoDocumento>(`${this.apiUrl}/${id}`, tipoDocumento);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}