import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PensumService } from 'src/app/services/pensum.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Pensum } from 'src/app/models/pensum.model';
import { Asignatura } from 'src/app/models/asignatura.model';


@Component({
    selector: 'app-pensum-management',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    template: `
   <div class="pensum-management">
  <div class="header">
    <h2>Gestionar Pensums</h2>
    <button class="btn-add" (click)="showAddForm()">Agregar Pensum</button>
  </div>

  <div *ngIf="showForm" class="pensum-form">
    <h3>{{ editingPensum ? 'Editar' : 'Agregar' }} Pensum</h3>
    <form [formGroup]="form" (ngSubmit)="create()">
      <div class="form-group">
        <label>Código Pensum:</label>
        <input formControlName="codigoPensum" />
      </div>
      <div class="form-group">
        <label>Asignaturas:</label>
        <select formControlName="asignaturas" multiple>
          <option value="null">Ninguna</option>
          <option *ngFor="let asignatura of asignaturas" [value]="asignatura.id">
            {{ asignatura.nombre }}
          </option>
        </select>
      </div>
      <!--<div class="form-group">
        <label>Programa Académico:</label>
        <select formControlName="programaAcademicoId">
           Comentado hasta que se tenga el modelo de Programa Académico -->
          <!-- <option *ngFor="let programa of programasAcademicos" [value]="programa.id">
            {{ programa.nombre }}
          </option> 
        </select>
      </div>-->
      <div class="form-group">
        <label>Estado del Pensum:</label>
        <select formControlName="estado">
          <option [value]="true">Activo</option>
          <option [value]="false">Inactivo</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-save">Guardar</button>
        <button type="button" class="btn-cancel" (click)="cancelForm()">Cancelar</button>
      </div>
    </form>
  </div>

  <div class="pensum-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Código Pensum</th>
          <th>Asignaturas</th>
          <!--<th>Programa Académico</th>-->
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let pensum of pensums">
          <td>{{ pensum.id }}</td>
          <td>{{ pensum.codigoPensum }}</td>
          <td>{{ getAsignaturasNombres(pensum) }}</td>
          <!--<td>{{ pensum.programaAcademico?.nombre || 'N/A' }}</td>-->
          <td>
            <span class="status-badge" [ngClass]="{'active': pensum.estado, 'inactive': !pensum.estado}">
              {{ pensum.estado ? 'Activo' : 'Inactivo' }}
            </span>
          </td>
          <td class="actions">
            <button class="btn-edit" (click)="editPensum(pensum)">Editar</button>
            <button class="btn-delete" (click)="deletePensum(pensum.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `,
   styles: [
    `
      .pensum-management {
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

      .pensum-form {
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

      .pensum-table {
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
export class PensumManagementComponent implements OnInit {
  pensums: Pensum[] = [];
  asignaturas: Asignatura[] = [];
  // programasAcademicos: ProgramaAcademico[] = []; // Comentado hasta que se tenga el modelo
  showForm = false;
  editingPensum: Pensum | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pensumService: PensumService,
    private asignaturaService: AsignaturaService,
    // private programaAcademicoService: ProgramaAcademicoService, // Comentado hasta que se tenga el modelo
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigoPensum: ['', [Validators.required]],
      asignaturas: [[], [Validators.required]],
      programaAcademicoId: [null], // Comentado hasta que se tenga el modelo
      estado: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadPensums();
    this.loadAsignaturas();
    // this.loadProgramasAcademicos(); // Comentado hasta que se tenga el modelo
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
    this.editingPensum = null;
    this.form.reset();
  }

  cancelForm() {
    this.showForm = false;
    this.editingPensum = null;
    this.form.reset();
  }

  editPensum(pensum: Pensum) {
    this.showForm = true;
    this.editingPensum = pensum;
    this.form.patchValue({
      codigoPensum: pensum.codigoPensum,
      asignaturas: pensum.asignaturas?.map(a => a.id) || [],
      programaAcademicoId: pensum.programaAcademico?.id || null, // Comentado hasta que se tenga el modelo
      estado: pensum.estado || null,
    });
  }

  create() {
    if (this.form.invalid) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    const pensum = this.form.value;
    pensum.asignaturas = this.form.value.asignaturas
      .filter((id: string) => id !== 'null')
      .map((id: number) => this.asignaturas.find(a => a.id === id));

    if (this.editingPensum) {
      this.pensumService.update(this.editingPensum.id, pensum).subscribe({
        next: () => {
          alert('Pensum actualizado con éxito');
          this.loadPensums();
          this.cancelForm();
        },
        error: (err) => {
          console.error('Error al actualizar el pensum', err);
          alert('Hubo un error al actualizar');
        }
      });
    } else {
      this.pensumService.create(pensum).subscribe({
        next: () => {
          alert('Pensum creado con éxito');
          this.loadPensums();
          this.cancelForm();
        },
        error: (err) => {
          console.error('Error al crear el pensum', err);
          alert('Hubo un error al crear');
        }
      });
    }
  }

  deletePensum(id: number) {
    if (confirm('¿Está seguro de eliminar este pensum?')) {
      this.pensumService.delete(id).subscribe({
        next: () => {
          alert('Pensum eliminado con éxito');
          this.loadPensums();
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          alert('Hubo un error al eliminar el pensum');
        }
      });
    }
  }

  getAsignaturasNombres(pensum: Pensum): string {
    return pensum.asignaturas?.map(a => a.nombre).join(', ') || 'N/A';
  }
}