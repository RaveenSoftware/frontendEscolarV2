import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TeacherService } from "src/app/services/teacher.service";
import { TipoDocumentoService } from "src/app/services/tipo-documento.service";
import { TipoGeneroService } from "src/app/services/tipo-genero.service";
import { FacultadService } from "src/app/services/faculty.service";
import { Teacher } from "src/app/models/teacher.model";

@Component({
  selector: "app-teacher-management",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="teacher-management">
      <div class="header">
        <h1>Gestionar Docentes</h1>
        <button class="btn-add" (click)="showAddForm()">
          <i class="fas fa-plus"></i> Agregar Docente
        </button>
      </div>

      <div *ngIf="showForm" class="teacher-form">
        <h2>{{ editingTeacher ? "Editar" : "Agregar" }} Docente</h2>

        <form [formGroup]="form" (ngSubmit)="create()">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input id="nombre" formControlName="nombre" required />
          </div>

          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input id="telefono" formControlName="telefono" required />
          </div>

          <div class="form-group">
            <label for="correoPersonal">Correo Personal:</label>
            <input id="correoPersonal" formControlName="correoPersonal" required />
          </div>

          <div class="form-group">
            <label for="correoInstitucional">Correo Institucional:</label>
            <input id="correoInstitucional" formControlName="correoInstitucional" required />
          </div>

          <div class="form-group">
            <label for="fechaNacimiento">Fecha de Nacimiento:</label>
            <input type="date" id="fechaNacimiento" formControlName="fechaNacimiento" required />
          </div>

          <div class="form-group">
            <label for="numeroDocumento">Número de Documento:</label>
            <input id="numeroDocumento" formControlName="numeroDocumento" required />
          </div>

          <div class="form-group">
            <label for="codigoInstitucional">Código Institucional:</label>
            <input id="codigoInstitucional" formControlName="codigoInstitucional" required />
          </div>

          <div class="form-group">
            <label for="especialidad">Especialidad:</label>
            <input id="especialidad" formControlName="especialidad" required />
          </div>

          <div class="form-group">
            <label for="tipoDocumentoId">Tipo de Documento:</label>
            <select id="tipoDocumentoId" formControlName="tipoDocumentoId">
              <option *ngFor="let tipo of tiposDocumento" [value]="tipo.id">{{ tipo.nombre }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="generoId">Género:</label>
            <select id="generoId" formControlName="generoId">
              <option *ngFor="let genero of generos" [value]="genero.id">{{ genero.nombre }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="facultadId">Facultad:</label>
            <select id="facultadId" formControlName="facultadId">
              <option *ngFor="let facultad of facultades" [value]="facultad.id">{{ facultad.nombre }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Estado:</label>
            <select formControlName="estado" name="estado">
              <option [ngValue]="true">Activo</option>
              <option [ngValue]="false">Inactivo</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-save" [disabled]="form.invalid">Guardar</button>
            <button type="button" class="btn-cancel" (click)="cancelForm()">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="teacher-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Especialidad</th>
              <th>Correo Institucional</th>
              <th>Facultad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let teacher of teachers">
              <td>{{ teacher.nombre }}</td>
              <td>{{ teacher.codigoInstitucional }}</td>
              <td>{{ teacher.especialidad }}</td>
              <td>{{ teacher.correoInstitucional }}</td>
              <td>{{ teacher.facultad?.nombre }}</td>
              <td>
                <span
                  [class]="
                    'status-badge ' +
                    (teacher.estado ? 'active' : 'inactive')
                  "
                >
                  {{ teacher.estado ? "Activo" : "Inactivo" }}
                </span>
              </td>
              <td class="actions">
                <button (click)="editTeacher(teacher)" class="btn-edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  (click)="deleteTeacher(teacher.id)"
                  class="btn-delete"
                >
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
    .teacher-management {
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
    .teacher-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
    }
    .form-group input,
    .form-group select {
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
    .btn-save,
    .btn-cancel {
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    .teacher-table {
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
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    .btn-edit,
    .btn-delete {
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
export class TeacherManagementComponent implements OnInit {
  teachers: Teacher[] = [];
  showForm = false;
  editingTeacher: Teacher | null = null;

  tiposDocumento: any[] = [];
  generos: any[] = [];
  facultades: any[] = [];

  form: FormGroup;

  private teacherService = inject(TeacherService);
  private tipoDocumentoService = inject(TipoDocumentoService);
  private tipoGeneroService = inject(TipoGeneroService);
  private facultadService = inject(FacultadService);
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      correoPersonal: ["", [Validators.required, Validators.email]],
      correoInstitucional: ["", [Validators.required, Validators.email]],
      fechaNacimiento: ["", [Validators.required]],
      numeroDocumento: ["", [Validators.required]],
      codigoInstitucional: ["", [Validators.required]],
      especialidad: ["", [Validators.required]],
      tipoDocumentoId: [null, [Validators.required]],
      generoId: [null, [Validators.required]],
      facultadId: [null, [Validators.required]],
      estado: [true],
    });
  }

  ngOnInit(): void {
    this.loadTeachers();
    this.loadTiposDocumento();
    this.loadGeneros();
    this.loadFacultades();
  }

  loadTeachers() {
    this.teacherService.list().subscribe({
      next: (teachers) => (this.teachers = teachers),
      error: (err) => console.error("Error al cargar docentes:", err),
    });
  }

  loadTiposDocumento() {
    this.tipoDocumentoService.list().subscribe({
      next: (tipos) => (this.tiposDocumento = tipos),
      error: (err) => console.error("Error al cargar tipos de documento:", err),
    });
  }

  loadGeneros() {
    this.tipoGeneroService.list().subscribe({
      next: (generos) => (this.generos = generos),
      error: (err) => console.error("Error al cargar géneros:", err),
    });
  }

  loadFacultades() {
    this.facultadService.list().subscribe({
      next: (facultades) => (this.facultades = facultades),
      error: (err) => console.error("Error al cargar facultades:", err),
    });
  }

  showAddForm() {
    this.showForm = true;
    this.editingTeacher = null;
    this.form.reset({ estado: true });
  }

  create() {
    if (this.form.valid) {
      const teacherData = this.form.value;
      if (this.editingTeacher) {
        this.teacherService.update(this.editingTeacher.id, teacherData).subscribe({
          next: () => {
            alert("Docente actualizado con éxito");
            this.loadTeachers();
            this.showForm = false;
          },
          error: (err) => {
            console.error("Error al actualizar:", err);
            alert("Hubo un error al actualizar el docente");
          },
        });
      } else {
        this.teacherService.create(teacherData).subscribe({
          next: () => {
            alert("Docente creado con éxito");
            this.loadTeachers();
            this.showForm = false;
          },
          error: (err) => {
            console.error("Error al crear:", err);
            alert("Hubo un error al crear el docente");
          },
        });
      }
    }
  }

  editTeacher(teacher: Teacher) {
    this.showForm = true;
    this.editingTeacher = teacher;
    
    this.form.patchValue({
      ...teacher,
      tipoDocumentoId: teacher.tipoDocumento?.id || null,
      generoId: teacher.genero?.id || null,
      facultadId: teacher.facultad?.id || null,
    });
  }

  deleteTeacher(id: number) {
    if (confirm("¿Estás seguro de eliminar este docente?")) {
      this.teacherService.delete(id).subscribe({
        next: () => {
          alert("Docente eliminado con éxito");
          this.loadTeachers();
        },
        error: (err) => {
          console.error("Error al eliminar:", err);
          alert("Hubo un error al eliminar el docente");
        },
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.editingTeacher = null;
    this.form.reset();
  }
}