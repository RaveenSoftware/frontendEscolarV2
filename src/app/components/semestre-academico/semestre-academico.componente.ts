import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SemestreAcademicoService } from 'src/app/services/semestre-academico.service';
import { SemestreAcademico } from 'src/app/models/semestre-academico.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-semestre-academico-management',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    template: `
    <div class="semestre-academico-management">
  <div class="header">
    <h2>Gestionar Semestres Académicos</h2>
    <button class="btn-add" (click)="showAddForm()">Agregar Semestre Académico</button>
  </div>

  <div *ngIf="showForm" class="semestre-academico-form">
    <h3>{{ editingSemestre ? 'Editar' : 'Agregar' }} Semestre Académico</h3>
    <form [formGroup]="form" (ngSubmit)="create()">
      <div class="form-group">
        <label>Año:</label>
        <input formControlName="year" type="number" />
      </div>
      <div class="form-group">
        <label>Periodo Académico:</label>
        <select formControlName="periodoAcademico">
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
      <div class="form-group">
        <label>Descripción:</label>
        <input formControlName="descripcion" />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-save">Guardar</button>
        <button type="button" class="btn-cancel" (click)="cancelForm()">Cancelar</button>
      </div>
    </form>
  </div>

  <div class="semestre-academico-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Año</th>
          <th>Periodo Académico</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let semestre of semestresAcademicos">
          <td>{{ semestre.id }}</td>
          <td>{{ semestre.year }}</td>
          <td>{{ semestre.periodoAcademico }}</td>
          <td>{{ semestre.descripcion }}</td>
          <td class="actions">
            <button class="btn-edit" (click)="editSemestre(semestre)">Editar</button>
            <button class="btn-delete" (click)="deleteSemestre(semestre.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `,
    styles: [
        `
          .semestre-academico-management {
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
    
          .semestre-academico-form {
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
    
          .semestre-academico-table {
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
export class SemestreAcademicoManagementComponent implements OnInit {
    semestresAcademicos: SemestreAcademico[] = [];
    showForm = false;
    editingSemestre: SemestreAcademico | null = null;
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private semestreAcademicoService: SemestreAcademicoService
    ) {
        this.form = this.fb.group({
            year: ['', [Validators.required]],
            periodoAcademico: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.loadSemestresAcademicos();
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

    showAddForm() {
        this.showForm = true;
        this.editingSemestre = null;
        this.form.reset();
    }

    cancelForm() {
        this.showForm = false;
        this.editingSemestre = null;
        this.form.reset();
    }

    editSemestre(semestre: SemestreAcademico) {
        this.showForm = true;
        this.editingSemestre = semestre;
        this.form.patchValue({
            year: semestre.year,
            periodoAcademico: semestre.periodoAcademico,
            descripcion: semestre.descripcion,
        });
    }

    create() {
        if (this.form.invalid) {
            alert('Por favor, completa todos los campos obligatorios');
            return;
        }

        const semestreAcademico = this.form.value;

        if (this.editingSemestre) {
            this.semestreAcademicoService.update(this.editingSemestre.id, semestreAcademico).subscribe({
                next: () => {
                    alert('Semestre Académico actualizado con éxito');
                    this.loadSemestresAcademicos();
                    this.cancelForm();
                },
                error: (err) => {
                    console.error('Error al actualizar el semestre académico', err);
                    alert('Hubo un error al actualizar');
                }
            });
        } else {
            this.semestreAcademicoService.create(semestreAcademico).subscribe({
                next: () => {
                    alert('Semestre Académico creado con éxito');
                    this.loadSemestresAcademicos();
                    this.cancelForm();
                },
                error: (err) => {
                    console.error('Error al crear el semestre académico', err);
                    alert('Hubo un error al crear');
                }
            });
        }
    }

    deleteSemestre(id: number) {
        if (confirm('¿Está seguro de eliminar este semestre académico?')) {
            this.semestreAcademicoService.delete(id).subscribe({
                next: () => {
                    alert('Semestre Académico eliminado con éxito');
                    this.loadSemestresAcademicos();
                },
                error: (err) => {
                    console.error('Error al eliminar', err);
                    alert('Hubo un error al eliminar el semestre académico');
                }
            });
        }
    }
}