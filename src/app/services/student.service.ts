import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'api/v1/estudiantes';
  
  // Mock data for local development
  private mockStudents: Student[] = [
    {
      id: 1,
      nombre: 'John Doe',
      telefono: '3001234567',
      correoPersonal: 'john.doe@email.com',
      fechaNacimiento: '1995-05-15',
      numeroDocumento: '1234567890',
      estado: true,
      tipoDocumentoId: 1,
      generoId: 1,
      rolId: 1,
      programaId: 1,
      codigoInstitucional: 'EST001',
      correoInstitucional: 'john.doe@udes.edu.co'
    }
  ];

  constructor(private http: HttpClient) {}

  list(): Observable<Student[]> {
    return of(this.mockStudents);
  }

  get(id: number): Observable<Student> {
    const student = this.mockStudents.find(s => s.id === id);
    return of(student as Student);
  }

  create(student: Student): Observable<Student> {
    const newStudent = {
      ...student,
      id: this.mockStudents.length + 1
    };
    this.mockStudents.push(newStudent);
    return of(newStudent);
  }

  update(id: number, student: Student): Observable<Student> {
    const index = this.mockStudents.findIndex(s => s.id === id);
    if (index !== -1) {
      this.mockStudents[index] = { ...this.mockStudents[index], ...student };
      return of(this.mockStudents[index]);
    }
    return of({} as Student);
  }

  delete(id: number): Observable<void> {
    const index = this.mockStudents.findIndex(s => s.id === id);
    if (index !== -1) {
      this.mockStudents.splice(index, 1);
    }
    return of(void 0);
  }
}