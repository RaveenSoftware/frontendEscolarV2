import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramaAcademicoService } from '../../services/programa-academico.service';
import { FacultadService } from '../../services/faculty.service';
import { ProgramaAcademico } from '../../models/programa-academico.model';
import { Facultad } from '../../models/faculty.model';

@Component({
  selector: 'app-programa-academico',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="programa-management">
      <div class="header">
        <h1>Gestionar Programas Académicos</h1>
        <button class="btn-add" (click)="showAddForm()">
          <i class="fas fa-plus"></i> Agregar Programa
        </button>
      </div>

      <div *ngIf="showForm" class="programa-form">
        <h2>{{ editingPrograma ? 'Editar' : 'Agregar' }} Programa Académico</h2>
        <form [formGroup]="form" (ngSubmit)="savePrograma()">
          <div class="form-group">
            <label>Código del Programa:</label>
            <input 
              type="text" 
              formControlName="codigoPrograma" 
              required
            />
          </div>

          <div class="form-group">
            <label>Nombre del Programa:</label>
            <input 
              type="text" 
              formControlName="nombrePrograma" 
              required
            />
          </div>

          <div class="form-group">
            <label>Descripción:</label>
            <textarea 
              formControlName="descripcion" 
              rows="3"
            ></textarea>
          </div>

          <div class="form-group">
            <label>Facultad:</label>
            <select formControlName="facultadId" required>
              <option [ngValue]="null">Seleccione una facultad</option>
              <option *ngFor="let facultad of facultades" [value]="facultad.id">
                {{ facultad.nombre }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Créditos del Programa:</label>
            <input 
              type="number" 
              formControlName="creditosPrograma" 
              required
            />
          </div>

          <div class="form-group">
            <label>Estado:</label>
            <select formControlName="estado">
              <option [ngValue]="true">Activo</option>
              <option [ngValue]="false">Inactivo</option>
            </select>
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

      <div class="programa-table">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Facultad</th>
              <th>Créditos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let programa of programas">
              <td>{{ programa.codigoPrograma }}</td>
              <td>{{ programa.nombrePrograma }}</td>
              <td>{{ getFacultadNombre(programa.facultadId) }}</td>
              <td>{{ programa.creditosPrograma }}</td>
              <td>
                <span [class]="'status-badge ' + (programa.estado ? 'active' : 'inactive')">
                  {{ programa.estado ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="actions">
                <button class="btn-edit" (click)="editPrograma(programa)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" (click)="deletePrograma(programa.id!)">
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
    .programa-management {
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

    .programa-form {
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
      color: #333;
      font-weight: 500;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      border-color: #1a237e;
      box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.1);
      outline: none;
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

    .programa-table {
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
      .programa-management {
        padding: 1rem;
      }
    }
  `]
})
export class ProgramaAcademicoComponent implements OnInit {
  programas: ProgramaAcademico[] = [];
  facultades: Facultad[] = [];
  showForm = false;
  editingPrograma: ProgramaAcademico | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private programaService: ProgramaAcademicoService,
    private facultadService: FacultadService
  ) {
    this.form = this.fb.group({
      codigoPrograma: ['', [Validators.required]],
      nombrePrograma: ['', [Validators.required]],
      descripcion: [''],
      facultadId: [null, [Validators.required]],
      creditosPrograma: ['', [Validators.required, Validators.min(1)]],
      estado: [true]
    });
  }

  ngOnInit() {
    this.loadProgramas();
    this.loadFacultades();
  }

  loadProgramas() {
    this.programaService.list().subscribe({
      next: (programas) => {
        this.programas = programas;
      },
      error: (err) => {
        console.error('Error al cargar programas:', err);
      }
    });
  }

  loadFacultades() {
    this.facultadService.list().subscribe({
      next: (facultades) => {
        this.facultades = facultades;
      },
      error: (err) => {
        console.error('Error al cargar facultades:', err);
      }
    });
  }

  getFacultadNombre(facultadId: number | undefined): string {
    if (!facultadId) return 'N/A';
    const facultad = this.facultades.find(f => f.id === facultadId);
    return facultad ? facultad.nombre || 'N/A' : 'N/A';
  }

  showAddForm() {
    this.showForm = true;
    this.editingPrograma = null;
    this.form.reset({ estado: true });
  }

  cancelForm() {
    this.showForm = false;
    this.editingPrograma = null;
    this.form.reset({ estado: true });
  }

  editPrograma(programa: ProgramaAcademico) {
    this.showForm = true;
    this.editingPrograma = programa;
    this.form.patchValue({
      codigoPrograma: programa.codigoPrograma,
      nombrePrograma: programa.nombrePrograma,
      descripcion: programa.descripcion,
      facultadId: programa.facultadId,
      creditosPrograma: programa.creditosPrograma,
      estado: programa.estado
    });
  }

  savePrograma() {
    if (this.form.invalid) {
      return;
    }

    const programaData = this.form.value;

    if (this.editingPrograma) {
      this.programaService.update(this.editingPrograma.id!, programaData).subscribe({
        next: () => {
          alert('Programa actualizado con éxito');
          this.loadProgramas();
          this.cancelForm();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Hubo un error al actualizar el programa');
        }
      });
    } else {
      this.programaService.create(programaData).subscribe({
        next: () => {
          alert('Programa creado con éxito');
          this.loadProgramas();
          this.cancelForm();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Hubo un error al crear el programa');
        }
      });
    }
  }

  deletePrograma(id: number) {
    if (confirm('¿Está seguro de eliminar este programa?')) {
      this.programaService.delete(id).subscribe({
        next: () => {
          alert('Programa eliminado con éxito');
          this.loadProgramas();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Hubo un error al eliminar el programa');
        }
      });
    }
  }
}