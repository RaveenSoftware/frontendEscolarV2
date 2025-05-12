import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { SemestreAcademicoService } from 'src/app/services/semestre-academico.service';
// import { ProgramaAcademicoService } from 'src/app/services/programa-academico.service'; // Comentado hasta que se tenga el modelo
import { Curso } from 'src/app/models/curso.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Asignatura } from 'src/app/models/asignatura.model';
import { SemestreAcademico } from 'src/app/models/semestre-academico.model';
import { CommonModule } from '@angular/common';
// import { ProgramaAcademico } from 'src/app/models/programa-academico.model'; // Comentado hasta que se tenga el modelo

@Component({
  selector: 'app-curso-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="curso-management">
  <div class="header">
    <h2>Gestionar Cursos</h2>
    <button class="btn-add" (click)="showAddForm()">Agregar Curso</button>
  </div>

  <div *ngIf="showForm" class="curso-form">
    <h3>{{ editingCurso ? 'Editar' : 'Agregar' }} Curso</h3>
    <form [formGroup]="form" (ngSubmit)="create()">
      <div class="form-group">
        <label>Nombre:</label>
        <input formControlName="nombre" />
      </div>
      <div class="form-group">
        <label>Grupo:</label>
        <input formControlName="grupo" />
      </div>
      <div class="form-group">
        <label>Docente:</label>
        <select formControlName="docenteId">
          <option *ngFor="let docente of docentes" [value]="docente.id">
            {{ docente.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Asignatura:</label>
        <select formControlName="asignaturaId">
          <option *ngFor="let asignatura of asignaturas" [value]="asignatura.id">
            {{ asignatura.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Semestre Académico:</label>
        <select formControlName="semestreAcademicoId">
          <option *ngFor="let semestre of semestresAcademicos" [value]="semestre.id">
            {{ semestre.year }} - {{ semestre.periodoAcademico }}
          </option>
        </select>
      </div>
      <!-- Comentado hasta que se tenga el modelo de Programa Académico -->
      <!-- <div class="form-group">
        <label>Programa Académico:</label>
        <select formControlName="programaAcademicoId">
          <option *ngFor="let programa of programasAcademicos" [value]="programa.id">
            {{ programa.nombre }}
          </option>
        </select>
      </div> -->
      <!-- Comentado hasta que se tenga el modelo de Aula Horario -->
      <!-- <div class="form-group">
        <label>Aula Horario:</label>
        <select formControlName="aulaHorarioId">
          <option *ngFor="let aula of aulasHorarios" [value]="aula.id">
            {{ aula.nombre }}
          </option>
        </select>
      </div> -->
      <!-- Comentado hasta que se tenga el modelo de Matricula Académica -->
      <!-- <div class="form-group">
        <label>Matricula Académica:</label>
        <select formControlName="matriculaAcademicoId">
          <option *ngFor="let matricula of matriculasAcademicas" [value]="matricula.id">
            {{ matricula.nombre }}
          </option>
        </select>
      </div> -->
      <div class="form-actions">
        <button type="submit" class="btn-save">Guardar</button>
        <button type="button" class="btn-cancel" (click)="cancelForm()">Cancelar</button>
      </div>
    </form>
  </div>

  <div class="curso-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Grupo</th>
          <th>Docente</th>
          <th>Asignatura</th>
          <th>Semestre Académico</th>
          <!-- Comentado hasta que se tenga el modelo de Programa Académico -->
          <!-- <th>Programa Académico</th> -->
          <!-- Comentado hasta que se tenga el modelo de Aula Horario -->
          <!-- <th>Aula Horario</th> -->
          <!-- Comentado hasta que se tenga el modelo de Matricula Académica -->
          <!-- <th>Matricula Académica</th> -->
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let curso of cursos">
          <td>{{ curso.id }}</td>
          <td>{{ curso.nombre }}</td>
          <td>{{ curso.grupo }}</td>
          <td>{{ curso.docente?.nombre || 'N/A' }}</td>
          <td>{{ curso.asignatura?.nombre || 'N/A' }}</td>
          <td>{{ curso.semestreAcademico?.year }} - {{ curso.semestreAcademico?.periodoAcademico }}</td>
          <!-- Comentado hasta que se tenga el modelo de Programa Académico -->
          <!-- <td>{{ curso.programaAcademico?.nombre || 'N/A' }}</td> -->
          <!-- Comentado hasta que se tenga el modelo de Aula Horario -->
          <!-- <td>{{ curso.aulaHorario?.nombre || 'N/A' }}</td> -->
          <!-- Comentado hasta que se tenga el modelo de Matricula Académica -->
          <!-- <td>{{ curso.matriculaAcademica?.nombre || 'N/A' }}</td> -->
          <td class="actions">
            <button class="btn-edit" (click)="editCurso(curso)">Editar</button>
            <button class="btn-delete" (click)="deleteCurso(curso.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `,
  styles: [
    `
      .curso-management {
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

      .curso-form {
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

      .curso-table {
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

      .btn-add,
      .btn-save,
      .btn-cancel,
      .btn-edit,
      .btn-delete {
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      .btn-add:hover {
        background-color: #303f9f;
      }

      .btn-save:hover {
        background-color: #303f9f;
      }

      .btn-cancel:hover {
        background-color: #555;
      }

      .btn-edit:hover {
        color: #303f9f;
      }

      .btn-delete:hover {
        color: #b71c1c;
      }
    `,
  ],
})
export class CursoManagementComponent implements OnInit {
    cursos: Curso[] = [];
    docentes: Teacher[] = [];
    asignaturas: Asignatura[] = [];
    semestresAcademicos: SemestreAcademico[] = [];
    // programasAcademicos: ProgramaAcademico[] = []; // Comentado hasta que se tenga el modelo
    showForm = false;
    editingCurso: Curso | null = null;
    form: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private cursoService: CursoService,
      private teacherService: TeacherService,
      private asignaturaService: AsignaturaService,
      private semestreAcademicoService: SemestreAcademicoService,
      // private programaAcademicoService: ProgramaAcademicoService // Comentado hasta que se tenga el modelo
    ) {
      this.form = this.fb.group({
        nombre: ['', [Validators.required]],
        grupo: ['', [Validators.required]],
        docenteId: [null, [Validators.required]],
        asignaturaId: [null, [Validators.required]],
        semestreAcademicoId: [null, [Validators.required]],
        // programaAcademicoId: [null], // Comentado hasta que se tenga el modelo
      });
    }
  
    ngOnInit(): void {
      this.loadCursos();
      this.loadDocentes();
      this.loadAsignaturas();
      this.loadSemestresAcademicos();
      // this.loadProgramasAcademicos(); // Comentado hasta que se tenga el modelo
    }
  
    loadCursos() {
      this.cursoService.list().subscribe({
        next: (cursos) => {
          this.cursos = cursos;
        },
        error: (err) => {
          console.error('Error al cargar los cursos', err);
        }
      });
    }
  
    loadDocentes() {
      this.teacherService.list().subscribe({
        next: (docentes) => {
          this.docentes = docentes;
        },
        error: (err) => {
          console.error('Error al cargar los docentes', err);
        }
      });
    }
  
    loadAsignaturas() {
      this.asignaturaService.list().subscribe({
        next: (asignaturas) => {
          this.asignaturas = asignaturas;
        },
        error: (err) => {
          console.error('Error al cargar las asignaturas', err);
        }
      });
    }
  
    loadSemestresAcademicos() {
      this.semestreAcademicoService.list().subscribe({
        next: (semestres) => {
          this.semestresAcademicos = semestres;
        },
        error: (err) => {
          console.error('Error al cargar los semestres académicos', err);
        }
      });
    }
  
    // loadProgramasAcademicos() {
    //   this.programaAcademicoService.list().subscribe({
    //     next: (programas) => {
    //       this.programasAcademicos = programas;
    //     },
    //     error: (err) => {
    //       console.error('Error al cargar los programas académicos', err);
    //     }
    //   });
    // }
  
    showAddForm() {
      this.showForm = true;
      this.editingCurso = null;
      this.form.reset();
    }
  
    cancelForm() {
      this.showForm = false;
      this.editingCurso = null;
      this.form.reset();
    }
  
    editCurso(curso: Curso) {
      this.showForm = true;
      this.editingCurso = curso;
      this.form.patchValue({
        nombre: curso.nombre,
        grupo: curso.grupo,
        docenteId: curso.docente?.id || null,
        asignaturaId: curso.asignatura?.id || null,
        semestreAcademicoId: curso.semestreAcademico?.id || null,
        // programaAcademicoId: curso.programaAcademico?.id || null, // Comentado hasta que se tenga el modelo
      });
    }
  
    create() {
      if (this.form.invalid) {
        alert('Por favor, completa todos los campos obligatorios');
        return;
      }
  
      const curso = this.form.value;
  
      if (this.editingCurso) {
        this.cursoService.update(this.editingCurso.id, curso).subscribe({
          next: () => {
            alert('Curso actualizado con éxito');
            this.loadCursos();
            this.cancelForm();
          },
          error: (err) => {
            console.error('Error al actualizar el curso', err);
            alert('Hubo un error al actualizar');
          }
        });
      } else {
        this.cursoService.create(curso).subscribe({
          next: () => {
            alert('Curso creado con éxito');
            this.loadCursos();
            this.cancelForm();
          },
          error: (err) => {
            console.error('Error al crear el curso', err);
            alert('Hubo un error al crear');
          }
        });
      }
    }
  
    deleteCurso(id: number) {
      if (confirm('¿Está seguro de eliminar este curso?')) {
        this.cursoService.delete(id).subscribe({
          next: () => {
            alert('Curso eliminado con éxito');
            this.loadCursos();
          },
          error: (err) => {
            console.error('Error al eliminar', err);
            alert('Hubo un error al eliminar el curso');
          }
        });
      }
    }
  }