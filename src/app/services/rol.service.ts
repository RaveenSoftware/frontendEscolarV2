import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = 'api/v1/roles';

  constructor(private http: HttpClient) {}

  list(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }

  get(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/${id}`);
  }

  create(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl, rol);
  }

  update(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/${id}`, rol);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}