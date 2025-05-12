import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { PensumService } from 'src/app/services/pensum.service';
import { Asignatura } from 'src/app/models/asignatura.model';
import { Pensum } from 'src/app/models/pensum.model';

@Component({
  selector: 'app-asignatura-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="asignatura-management">
      <div class="header">
        <h1>Gestionar Asignaturas</h1>
        <button class="btn-add" (click)="showAddForm()">Agregar Asignatura</button>
      </div>

      <div *ngIf="showForm" class="asignatura-form">
        <h2>{{ editingAsignatura ? 'Editar' : 'Agregar' }} Asignatura</h2>
        <form [formGroup]="form" (ngSubmit)="create()">
          <div class="form-group">
            <label for="codigo">Código:</label>
            <input id="codigo" formControlName="codigo" />
          </div>
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input id="nombre" formControlName="nombre" />
          </div>
          <div class="form-group">
  <label for="predecesoraId">Predecesora:</label>
  <select id="predecesoraId" formControlName="predecesoraId">
    <option [value]="null">Ninguna</option>
    <option *ngFor="let asignatura of asignaturas" [value]="asignatura.id">{{ asignatura.nombre }}</option>
  </select>
</div>
          <div class="form-group">
            <label for="numeroSemestre">Número de Semestre:</label>
            <input id="numeroSemestre" formControlName="numeroSemestre" />
          </div>
          <div class="form-group">
            <label for="numeroCreditos">Número de Créditos:</label>
            <input id="numeroCreditos" formControlName="numeroCreditos" />
          </div>
          <div class="form-group">
            <label for="codigoPensum">Pensum:</label>
            <select id="codigoPensum" formControlName="codigoPensum">
              <option *ngFor="let pensum of pensums" [value]="pensum.codigoPensum">{{ pensum.codigoPensum }}</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save">Guardar</button>
            <button type="button" class="btn-cancel" (click)="cancelForm()">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="asignatura-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Predecesora</th>
              <th>Número de Semestre</th>
              <th>Número de Créditos</th>
              <th>Pensum</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let asignatura of asignaturas">
              <td>{{ asignatura.id }}</td>
              <td>{{ asignatura.codigo }}</td>
              <td>{{ asignatura.nombre }}</td>
              <td>{{ asignatura.predecesora?.nombre || 'N/A' }}</td>
              <td>{{ asignatura.numeroSemestre }}</td>
              <td>{{ asignatura.numeroCreditos }}</td>
              <td>{{ asignatura.pensum?.codigoPensum || 'N/A' }}</td>
              <td class="actions">
                <button class="btn-edit" (click)="editAsignatura(asignatura)">Editar</button>
                <button class="btn-delete" (click)="deleteAsignatura(asignatura.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .asignatura-management {
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

      .asignatura-form {
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

      .asignatura-table {
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
export class AsignaturaManagementComponent implements OnInit {
  asignaturas: Asignatura[] = [];
  pensums: Pensum[] = [];
  showForm = false;
  editingAsignatura: Asignatura | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private asignaturaService: AsignaturaService,
    private pensumService: PensumService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      predecesoraId: [null],
      numeroSemestre: ['', [Validators.required]],
      numeroCreditos: ['', [Validators.required]],
      codigoPensum: [null],
    });
  }

  ngOnInit(): void {
    this.loadAsignaturas();
    this.loadPensums();
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

  loadPensums() {
    this.pensumService.list().subscribe({
      next: (pensums) => {
        this.pensums = pensums;
      },
      error: (err) => {
        console.error('Error al cargar los pensums', err);
      }
    });
  }

  showAddForm() {
    this.showForm = true;
    this.editingAsignatura = null;
    this.form.reset();
  }

  cancelForm() {
    this.showForm = false;
    this.editingAsignatura = null;
    this.form.reset();
  }

  editAsignatura(asignatura: Asignatura) {
    this.showForm = true;
    this.editingAsignatura = asignatura;
    this.form.patchValue({
      codigo: asignatura.codigo,
      nombre: asignatura.nombre,
      predecesoraId: asignatura.predecesora?.id || null,
      numeroSemestre: asignatura.numeroSemestre,
      numeroCreditos: asignatura.numeroCreditos,
      codigoPensum: asignatura.pensum?.codigoPensum || '',
    });
  }

  create() {
    if (this.form.invalid) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }
  
    const asignatura = this.form.value;
  
    // Asegurar que predecesoraId sea null si se selecciona "Ninguna"
    asignatura.predecesora = asignatura.predecesoraId 
      ? this.asignaturas.find(a => a.id === asignatura.predecesoraId) || null 
      : null;
    asignatura.pensum = this.pensums.find(p => p.codigoPensum === asignatura.codigoPensum) || null;
  
    if (this.editingAsignatura) {
      this.asignaturaService.update(this.editingAsignatura.id, asignatura).subscribe({
        next: () => {
          alert('Asignatura actualizada con éxito');
          this.loadAsignaturas();
          this.cancelForm();
        },
        error: (err) => {
          console.error('Error al actualizar la asignatura', err);
          alert('Hubo un error al actualizar');
        }
      });
    } else {
      this.asignaturaService.create(asignatura).subscribe({
        next: () => {
          alert('Asignatura creada con éxito');
          this.loadAsignaturas();
          this.cancelForm();
        },
        error: (err) => {
          console.error('Error al crear la asignatura', err);
          alert('Hubo un error al crear');
        }
      });
    }
  }
  
  deleteAsignatura(id: number) {
    if (confirm('¿Está seguro de eliminar esta asignatura?')) {
      this.asignaturaService.delete(id).subscribe({
        next: () => {
          alert('Asignatura eliminada con éxito');
          this.loadAsignaturas();
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          alert('Hubo un error al eliminar la asignatura');
        }
      });
    }
  }
}