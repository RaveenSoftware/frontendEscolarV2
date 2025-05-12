import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = 'api/v1/docentes'; // URL del backend

  constructor(private http: HttpClient) {}

  list(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  create(teacher: Teacher): Observable<Teacher> {
    this.buscarPorId(teacher);
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  update(id: number, teacher: Teacher): Observable<Teacher> {
    this.buscarPorId(teacher);
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, teacher);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método privado para mapear IDs a objetos
  private buscarPorId(teacher: Teacher): void {
    teacher.tipoDocumento = { id: Number(teacher.tipoDocumentoId) };
    teacher.genero = { id: Number(teacher.generoId) };
    teacher.facultad = { id: Number(teacher.facultadId) };
    
  }
}
