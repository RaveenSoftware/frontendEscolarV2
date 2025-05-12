import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = new BehaviorSubject<Student[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      grade: '10th',
      enrollmentDate: new Date('2023-09-01'),
      status: 'active'
    }
  ]);

  getStudents(): Observable<Student[]> {
    return this.students.asObservable();
  }

  addStudent(student: Omit<Student, 'id'>): void {
    const currentStudents = this.students.getValue();
    const newId = currentStudents.length ? Math.max(...currentStudents.map(s => s.id)) + 1 : 1;
    this.students.next([...currentStudents, { ...student, id: newId }]);
  }

  updateStudent(updatedStudent: Student): void {
    const currentStudents = this.students.getValue();
    const index = currentStudents.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      currentStudents[index] = updatedStudent;
      this.students.next([...currentStudents]);
    }
  }

  deleteStudent(id: number): void {
    const currentStudents = this.students.getValue();
    this.students.next(currentStudents.filter(student => student.id !== id));
  }
}