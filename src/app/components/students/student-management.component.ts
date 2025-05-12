import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="student-management">
      <div class="header">
        <h1>Gestionar Alumnos</h1>
        <button class="btn-add" (click)="showAddForm()">
          <i class="fas fa-plus"></i> Agregar Alumno
        </button>
      </div>

      <div *ngIf="showForm" class="student-form">
        <h2>{{ editingStudent ? 'Editar' : 'Agregar' }} Alumno</h2>
        <form (submit)="saveStudent()">
          <div class="form-group">
            <label>Nombre:</label>
            <input type="text" [(ngModel)]="formData.name" name="name" required>
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" [(ngModel)]="formData.email" name="email" required>
          </div>
          <div class="form-group">
            <label>Grado:</label>
            <input type="text" [(ngModel)]="formData.grade" name="grade" required>
          </div>
          <div class="form-group">
            <label>Estado:</label>
            <select [(ngModel)]="formData.status" name="status">
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save">Guardar</button>
            <button type="button" class="btn-cancel" (click)="cancelForm()">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="students-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Grado</th>
              <th>Fecha de Inscripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let student of students">
              <td>{{ student.id }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.grade }}</td>
              <td>{{ student.enrollmentDate | date:'dd/MM/yyyy' }}</td>
              <td>
                <span [class]="'status-badge ' + student.status">
                  {{ student.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="actions">
                <button (click)="editStudent(student)" class="btn-edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button (click)="deleteStudent(student.id)" class="btn-delete">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .student-management {
      padding: 2rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .btn-add {
      background: #1a237e;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .student-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
    }
    .form-group input, .form-group select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    .btn-save {
      background: #1a237e;
      color: white;
    }
    .btn-cancel {
      background: #666;
      color: white;
    }
    .btn-save, .btn-cancel {
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    .students-table {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #f5f5f5;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    .btn-edit, .btn-delete {
      padding: 0.5rem;
      border-radius: 4px;
    }
    .btn-edit {
      color: #1a237e;
    }
    .btn-delete {
      color: #dc3545;
    }
    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 999px;
      font-size: 0.875rem;
    }
    .status-badge.active {
      background: #e8f5e9;
      color: #2e7d32;
    }
    .status-badge.inactive {
      background: #ffebee;
      color: #c62828;
    }
  `]
})
export class StudentManagementComponent implements OnInit {
  students: Student[] = [];
  showForm = false;
  editingStudent: Student | null = null;
  formData: Partial<Student> = {
    name: '',
    email: '',
    grade: '',
    status: 'active'
  };

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(
      students => this.students = students
    );
  }

  showAddForm() {
    this.showForm = true;
    this.editingStudent = null;
    this.formData = {
      name: '',
      email: '',
      grade: '',
      status: 'active'
    };
  }

  editStudent(student: Student) {
    this.showForm = true;
    this.editingStudent = student;
    this.formData = { ...student };
  }

  saveStudent() {
    if (this.editingStudent) {
      this.studentService.updateStudent({
        ...this.formData,
        id: this.editingStudent.id,
        enrollmentDate: this.editingStudent.enrollmentDate
      } as Student);
    } else {
      this.studentService.addStudent({
        ...this.formData,
        enrollmentDate: new Date()
      } as Student);
    }
    this.cancelForm();
  }

  deleteStudent(id: number) {
    if (confirm('¿Está seguro de eliminar este estudiante?')) {
      this.studentService.deleteStudent(id);
    }
  }

  cancelForm() {
    this.showForm = false;
    this.editingStudent = null;
    this.formData = {
      name: '',
      email: '',
      grade: '',
      status: 'active'
    };
  }
}