import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'api/v1/estudiantes';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 0) {
        errorMessage = 'Unable to connect to the server. Please verify that the backend service is running.';
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  list(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  get(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  create(student: Student): Observable<Student> {
    const studentData = {
      ...student,
      tipoDocumento: { id: student.tipoDocumentoId },
      genero: { id: student.generoId },
      programa: { id: student.programaId },
      rol: { id: 3 }
    };

    return this.http.post<Student>(this.apiUrl, studentData)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: number, student: Student): Observable<Student> {
    const studentData = {
      ...student,
      tipoDocumento: { id: student.tipoDocumentoId },
      genero: { id: student.generoId },
      programa: { id: student.programaId },
      rol: { id: 3 }
    };

    return this.http.put<Student>(`${this.apiUrl}/${id}`, studentData)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}