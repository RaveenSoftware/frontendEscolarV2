import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'api/v1/estudiantes';

  constructor(private http: HttpClient) {}

  list(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  get(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  create(student: Student): Observable<Student> {
    // Map the data to match backend expectations
    const studentData = {
      ...student,
      tipoDocumento: { id: student.tipoDocumentoId },
      genero: { id: student.generoId },
      programa: { id: student.programaId },
      rol: { id: 3 } // Default role ID for students
    };

    return this.http.post<Student>(this.apiUrl, studentData);
  }

  update(id: number, student: Student): Observable<Student> {
    // Map the data to match backend expectations
    const studentData = {
      ...student,
      tipoDocumento: { id: student.tipoDocumentoId },
      genero: { id: student.generoId },
      programa: { id: student.programaId },
      rol: { id: 3 } // Default role ID for students
    };

    return this.http.put<Student>(`${this.apiUrl}/${id}`, studentData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}