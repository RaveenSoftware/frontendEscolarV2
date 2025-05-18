import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrator } from '../models/administrator.model';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  private apiUrl = 'api/v1/administradores';

  constructor(private http: HttpClient) {}

  list(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(this.apiUrl);
  }

  create(administrator: Administrator): Observable<Administrator> {
    this.mapRelationships(administrator);
    return this.http.post<Administrator>(this.apiUrl, administrator);
  }

  update(id: number, administrator: Administrator): Observable<Administrator> {
    this.mapRelationships(administrator);
    return this.http.put<Administrator>(`${this.apiUrl}/${id}`, administrator);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapRelationships(administrator: Administrator): void {
    if (administrator.tipoDocumentoId) {
      administrator.tipoDocumento = { id: administrator.tipoDocumentoId };
    }
    if (administrator.generoId) {
      administrator.genero = { id: administrator.generoId };
    }
    if (administrator.rolId) {
      administrator.rol = { id: administrator.rolId };
    }
    if (administrator.facultadId) {
      administrator.facultad = { id: administrator.facultadId };
    }
  }
}