import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TipoGeneroService } from "src/app/services/tipo-genero.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TipoGenero } from "src/app/models/tipo-genero.model";

@Component({
  selector: "app-tipo-genero-management",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="tipo-genero-management">
      <div class="header">
        <h1>Gestionar Tipos de Género</h1>
        <button class="btn-add" (click)="showAddForm()">
          <i class="fas fa-plus"></i> Agregar Tipo de Género
        </button>
      </div>

      <div *ngIf="showForm" class="tipo-genero-form">
        <h2>{{ editingTipoGenero ? "Editar" : "Agregar" }} Tipo de Género</h2>
        <form [formGroup]="form" (ngSubmit)="create()">
          <div class="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              formControlName="nombre"
              required
            />
            <div class="error-message" *ngIf="form.get('nombre')?.touched && form.get('nombre')?.errors?.['required']">
              El nombre es requerido
            </div>
          </div>
          <div class="form-group">
            <label>Estado:</label>
            <select formControlName="estado">
              <option [ngValue]="true">Activo</option>
              <option [ngValue]="false">Inactivo</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save" [disabled]="form.invalid">Guardar</button>
            <button type="button" class="btn-cancel" (click)="cancelForm()">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div class="tipo-genero-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let tipoGenero of tiposGeneros">
              <td>{{ tipoGenero.id }}</td>
              <td>{{ tipoGenero.nombre }}</td>
              <td>
                <span
                  [class]="
                    'status-badge ' +
                    (tipoGenero.estado ? 'active' : 'inactive')
                  "
                >
                  {{ tipoGenero.estado ? "Activo" : "Inactivo" }}
                </span>
              </td>
              <td class="actions">
                <button (click)="editTipoGenero(tipoGenero)" class="btn-edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  (click)="deleteTipoGenero(tipoGenero.id)"
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
    .tipo-genero-management {
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

    .tipo-genero-form {
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

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
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

    .tipo-genero-table {
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

    .btn-add:hover,
    .btn-save:hover,
    .btn-cancel:hover,
    .btn-edit:hover,
    .btn-delete:hover {
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

    .status-badge {
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .status-badge.active:hover {
      background: #c8e6c9;
      color: #1b5e20;
    }

    .status-badge.inactive:hover {
      background: #ffcdd2;
      color: #b71c1c;
    }
  `]
})
export default class TipoGeneroManagementComponent implements OnInit {
  tiposGeneros: TipoGenero[] = [];
  showForm = false;
  editingTipoGenero: TipoGenero | null = null;

  private tipoGeneroService = inject(TipoGeneroService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    estado: [true, [Validators.required]],
  });

  ngOnInit(): void {
    this.loadGeneros();
  }

  loadGeneros() {
    this.tipoGeneroService.list().subscribe({
      next: (tiposGeneros) => {
        this.tiposGeneros = tiposGeneros;
      },
      error: (err) => {
        console.error("Error al cargar los géneros:", err);
      },
    });
  }

  showAddForm() {
    this.showForm = true;
    this.editingTipoGenero = null;
    this.form.reset({ nombre: "", estado: true });
  }

  cancelForm() {
    this.showForm = false;
    this.editingTipoGenero = null;
    this.form.reset({ nombre: "", estado: true });
  }

  editTipoGenero(tipoGenero: TipoGenero) {
    this.showForm = true;
    this.editingTipoGenero = tipoGenero;
    this.form.patchValue({
      nombre: tipoGenero.nombre,
      estado: tipoGenero.estado,
    });
  }

  deleteTipoGenero(id: number) {
    if (confirm("¿Está seguro de eliminar este tipo de género?")) {
      this.tipoGeneroService.delete(id).subscribe({
        next: () => {
          alert("Tipo de género eliminado con éxito");
          this.loadGeneros();
        },
        error: (err) => {
          console.error("Error al eliminar:", err);
          alert("Hubo un error al eliminar el tipo de género");
        },
      });
    }
  }

  create() {
    if (this.form.invalid) {
      return;
    }

    const tipoGenero = this.form.value;

    if (this.editingTipoGenero) {
      this.tipoGeneroService.update(
        this.editingTipoGenero.id,
        tipoGenero
      ).subscribe({
        next: () => {
          alert("Tipo de género actualizado con éxito");
          this.loadGeneros();
          this.cancelForm();
        },
        error: (err) => {
          console.error("Error al actualizar:", err);
          alert("Hubo un error al actualizar el tipo de género");
        },
      });
    } else {
      this.tipoGeneroService.create(tipoGenero).subscribe({
        next: () => {
          alert("Tipo de género creado con éxito");
          this.loadGeneros();
          this.cancelForm();
        },
        error: (err) => {
          console.error("Error al crear:", err);
          alert("Hubo un error al crear el tipo de género");
        },
      });
    }
  }
}