import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsesoriaService } from 'src/app/services/asesoria.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { StudentService } from 'src/app/services/student.service';
import { Asesoria } from 'src/app/models/asesoria.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Student } from 'src/app/models/student.model';
import { CommonModule } from '@angular/common';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
// import { Curso } from 'src/app/models/curso.model'; // Comentado hasta que se tenga el modelo

@Component({
  selector: 'app-asesoria-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="asesoria-management">
      <div class="header">
        <h2>Gestionar Asesorías</h2>
        <button class="btn-add" (click)="showAddForm()">Agregar Asesoría</button>
      </div>

      <div *ngIf="showForm" class="asesoria-form">
        <h3>{{ editingAsesoria ? 'Editar' : 'Agregar' }} Asesoría</h3>
        <form [formGroup]="form" (ngSubmit)="create()">
          <div class="form-group">
            <label>Tema:</label>
            <input formControlName="tema" />
          </div>
          <div class="form-group">
            <label>Curso:</label>
            <select formControlName="cursoId">
              <option *ngFor="let curso of cursos" [value]="curso.id">
                {{ curso.nombre }}
              </option> 
            </select>
          </div>
          <div class="form-group">
            <label>Hora Inicio:</label>
            <input formControlName="horaInicio" type="time" />
          </div>
          <div class="form-group">
            <label>Hora Fin:</label>
            <input formControlName="horaFin" type="time" />
          </div>
          <div class="form-group">
            <label>Docente:</label>
            <select formControlName="docenteId">
              <option *ngFor="let docente of docentes" [value]="docente.id">
                {{ docente.nombre }}
              </option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save">Guardar</button>
            <button type="button" class="btn-cancel" (click)="cancelForm()">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="asesoria-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tema</th>
              <th>Curso</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Docente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let asesoria of asesorias">
              <td>{{ asesoria.id }}</td>
              <td>{{ asesoria.tema }}</td>
              <td>{{ asesoria.curso?.nombre || 'N/A' }}</td>
              <td>{{ asesoria.horaInicio }}</td>
              <td>{{ asesoria.horaFin }}</td>
              <td>{{ asesoria.docente?.nombre || 'N/A' }}</td>
              <td class="actions">
                <button class="btn-edit" (click)="editAsesoria(asesoria)">Editar</button>
                <button class="btn-delete" (click)="deleteAsesoria(asesoria.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .asesoria-management {
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

      .asesoria-form {
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

      .asesoria-table {
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
export class AsesoriaManagementComponent implements OnInit {
    asesorias: Asesoria[] = [];
    docentes: Teacher[] = [];
    cursos: Curso[] = []; // Comentado hasta que se tenga el modelo
    showForm = false;
    editingAsesoria: Asesoria | null = null;
    form: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private asesoriaService: AsesoriaService,
      private teacherService: TeacherService,
      private cursoService: CursoService // Comentado hasta que se tenga el modelo
    ) {
      this.form = this.fb.group({
        tema: ['', [Validators.required]],
        cursoId: [null, [Validators.required]], // Comentado hasta que se tenga el modelo
        horaInicio: ['', [Validators.required]],
        horaFin: ['', [Validators.required]],
        docenteId: [null, [Validators.required]],
      });
    }
  
    ngOnInit(): void {
      this.loadAsesorias();
      this.loadDocentes();
      this.loadCursos(); // Comentado hasta que se tenga el modelo
    }
  
    loadAsesorias() {
      this.asesoriaService.list().subscribe({
        next: (asesorias) => {
          this.asesorias = asesorias;
        },
        error: (err) => {
          console.error('Error al cargar las asesorías', err);
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
  
    showAddForm() {
      this.showForm = true;
      this.editingAsesoria = null;
      this.form.reset();
    }
  
    cancelForm() {
      this.showForm = false;
      this.editingAsesoria = null;
      this.form.reset();
    }
  
    editAsesoria(asesoria: Asesoria) {
      this.showForm = true;
      this.editingAsesoria = asesoria;
      this.form.patchValue({
        tema: asesoria.tema,
        cursoId: asesoria.curso?.id || null, // Comentado hasta que se tenga el modelo
        horaInicio: asesoria.horaInicio,
        horaFin: asesoria.horaFin,
        docenteId: asesoria.docente?.id || null,
      });
    }
  
    create() {
      if (this.form.invalid) {
        alert('Por favor, completa todos los campos obligatorios');
        return;
      }
    
      const formValue = this.form.value;
    
      // Convertir horas al formato requerido por el backend
      const horarioData = {
        ...formValue,
        horaInicio: formValue.horaInicio.includes(':') ? `${formValue.horaInicio}:00` : formValue.horaInicio,
        horaFin: formValue.horaFin.includes(':') ? `${formValue.horaFin}:00` : formValue.horaFin,
      };
    
      if (this.editingAsesoria) {
        this.asesoriaService.update(this.editingAsesoria.id, horarioData).subscribe({
          next: () => {
            alert('Asesoría actualizada con éxito');
            this.loadAsesorias();
            this.cancelForm();
          },
          error: (err) => {
            console.error('Error al actualizar la asesoría', err);
            alert('Hubo un error al actualizar');
          }
        });
      } else {
        this.asesoriaService.create(horarioData).subscribe({
          next: () => {
            alert('Asesoría creada con éxito');
            this.loadAsesorias();
            this.cancelForm();
          },
          error: (err) => {
            console.error('Error al crear la asesoría', err);
            alert('Hubo un error al crear');
          }
        });
      }
    }
    
  
    deleteAsesoria(id: number) {
      if (confirm('¿Está seguro de eliminar esta asesoría?')) {
        this.asesoriaService.delete(id).subscribe({
          next: () => {
            alert('Asesoría eliminada con éxito');
            this.loadAsesorias();
          },
          error: (err) => {
            console.error('Error al eliminar', err);
            alert('Hubo un error al eliminar la asesoría');
          }
        });
      }
    }
  }