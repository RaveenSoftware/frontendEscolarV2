import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoGeneroService } from '../../services/tipo-genero.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="student-management">
      <div class="header">
        <h1>Gestionar Estudiantes</h1>
        <button class="btn-add" (click)="showAddForm()">
          <i class="fas fa-plus"></i> Agregar Estudiante
        </button>
      </div>

      <div *ngIf="showForm" class="student-form">
        <h2>{{ editingStudent ? 'Editar' : 'Agregar' }} Estudiante</h2>
        <form [formGroup]="form" (ngSubmit)="saveStudent()">
          <!-- Personal Data Section -->
          <div class="form-section">
            <h3>Datos Personales</h3>
            
            <div class="form-group">
              <label>Nombre Completo:</label>
              <input type="text" formControlName="nombre" required>
              <div class="error-message" *ngIf="form.get('nombre')?.touched && form.get('nombre')?.errors?.['required']">
                El nombre es requerido
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Tipo de Documento:</label>
                <select formControlName="tipoDocumentoId" required>
                  <option [ngValue]="null">Seleccione...</option>
                  <option *ngFor="let tipo of tiposDocumento" [value]="tipo.id">
                    {{ tipo.nombre }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Número de Documento:</label>
                <input type="text" formControlName="numeroDocumento" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Género:</label>
                <select formControlName="generoId" required>
                  <option [ngValue]="null">Seleccione...</option>
                  <option *ngFor="let genero of generos" [value]="genero.id">
                    {{ genero.nombre }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Fecha de Nacimiento:</label>
                <input type="date" formControlName="fechaNacimiento" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Teléfono:</label>
                <input type="tel" formControlName="telefono" required>
              </div>

              <div class="form-group">
                <label>Correo Personal:</label>
                <input type="email" formControlName="correoPersonal" required>
              </div>
            </div>
          </div>

          <!-- Academic Data Section -->
          <div class="form-section">
            <h3>Datos Académicos</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label>Código Institucional:</label>
                <input type="text" formControlName="codigoInstitucional" required>
              </div>

              <div class="form-group">
                <label>Correo Institucional:</label>
                <input type="email" formControlName="correoInstitucional" required>
              </div>
            </div>

            <div class="form-group">
              <label>Programa Académico:</label>
              <select formControlName="programaId" required>
                <option [ngValue]="null">Seleccione...</option>
                <option value="1">Ingeniería de Sistemas</option>
                <option value="2">Ingeniería Industrial</option>
                <option value="3">Medicina</option>
              </select>
            </div>

            <div class="form-group">
              <label>Estado:</label>
              <select formControlName="estado">
                <option [ngValue]="true">Activo</option>
                <option [ngValue]="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-save" [disabled]="form.invalid">
              Guardar
            </button>
            <button type="button" class="btn-cancel" (click)="cancelForm()">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div class="student-table">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Correo Institucional</th>
              <th>Programa</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let student of students">
              <td>{{ student.codigoInstitucional }}</td>
              <td>{{ student.nombre }}</td>
              <td>{{ student.numeroDocumento }}</td>
              <td>{{ student.correoInstitucional }}</td>
              <td>Programa {{ student.programaId }}</td>
              <td>
                <span [class]="'status-badge ' + (student.estado ? 'active' : 'inactive')">
                  {{ student.estado ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="actions">
                <button class="btn-edit" (click)="editStudent(student)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" (click)="deleteStudent(student.id!)">
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
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .form-section {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }

    .form-section h3 {
      color: #1a237e;
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group select:focus {
      border-color: #1a237e;
      box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.1);
      outline: none;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-save {
      background: #1a237e;
      color: white;
    }

    .btn-cancel {
      background: #666;
      color: white;
    }

    .btn-save,
    .btn-cancel {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-weight: 500;
    }

    .student-table {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background: #f5f5f5;
      font-weight: 600;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-edit,
    .btn-delete {
      padding: 0.5rem;
      border-radius: 4px;
      transition: all 0.3s ease;
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

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StudentManagementComponent implements OnInit {
  students: Student[] = [];
  tiposDocumento: any[] = [];
  generos: any[] = [];
  showForm = false;
  editingStudent: Student | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private tipoDocumentoService: TipoDocumentoService,
    private tipoGeneroService: TipoGeneroService
  ) {
    this.form = this.fb.group({
      // Personal Data
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correoPersonal: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      tipoDocumentoId: [null, [Validators.required]],
      generoId: [null, [Validators.required]],
      
      // Academic Data
      codigoInstitucional: ['', [Validators.required]],
      correoInstitucional: ['', [Validators.required, Validators.email]],
      programaId: [null, [Validators.required]],
      estado: [true]
    });
  }

  ngOnInit() {
    this.loadStudents();
    this.loadTiposDocumento();
    this.loadGeneros();
  }

  loadStudents() {
    this.studentService.list().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (err) => {
        console.error('Error al cargar estudiantes:', err);
      }
    });
  }

  loadTiposDocumento() {
    this.tipoDocumentoService.list().subscribe({
      next: (tipos) => {
        this.tiposDocumento = tipos;
      },
      error: (err) => {
        console.error('Error al cargar tipos de documento:', err);
      }
    });
  }

  loadGeneros() {
    this.tipoGeneroService.list().subscribe({
      next: (generos) => {
        this.generos = generos;
      },
      error: (err) => {
        console.error('Error al cargar géneros:', err);
      }
    });
  }

  showAddForm() {
    this.showForm = true;
    this.editingStudent = null;
    this.form.reset({ estado: true });
  }

  cancelForm() {
    this.showForm = false;
    this.editingStudent = null;
    this.form.reset({ estado: true });
  }

  editStudent(student: Student) {
    this.showForm = true;
    this.editingStudent = student;
    this.form.patchValue({
      ...student,
      fechaNacimiento: student.fechaNacimiento?.split('T')[0]
    });
  }

  saveStudent() {
    if (this.form.invalid) {
      return;
    }

    const studentData = this.form.value;

    if (this.editingStudent) {
      this.studentService.update(this.editingStudent.id!, studentData).subscribe({
        next: () => {
          alert('Estudiante actualizado con éxito');
          this.loadStudents();
          this.cancelForm();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Hubo un error al actualizar el estudiante');
        }
      });
    } else {
      this.studentService.create(studentData).subscribe({
        next: () => {
          alert('Estudiante creado con éxito');
          this.loadStudents();
          this.cancelForm();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Hubo un error al crear el estudiante');
        }
      });
    }
  }

  deleteStudent(id: number) {
    if (confirm('¿Está seguro de eliminar este estudiante?')) {
      this.studentService.delete(id).subscribe({
        next: () => {
          alert('Estudiante eliminado con éxito');
          this.loadStudents();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Hubo un error al eliminar el estudiante');
        }
      });
    }
  }
}