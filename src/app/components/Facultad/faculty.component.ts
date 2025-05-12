import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FacultadService } from "src/app/services/faculty.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Facultad } from "src/app/models/faculty.model";
import { provideHttpClient } from "@angular/common/http";

@Component({
  selector: "app-facultad-management",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="facultad-management">
      <div class="header">
        <h1>Gestionar Facultades</h1>
        <button class="btn-add" (click)="showAddForm()">
          <i class="fas fa-plus"></i> Agregar Facultad
        </button>
      </div>

      <div *ngIf="showForm" class="facultad-form">
        <h2>{{ editingFacultad ? "Editar" : "Agregar" }} Facultad</h2>

        <form [formGroup]="form" (ngSubmit)="create()">
          <div class="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              formControlName="nombre"
              name="nombre"
              required
            />
          </div>
          <div class="form-group">
            <label>Estado:</label>
            <select formControlName="estado" name="estado">
              <option [ngValue]="true">Activo</option>
              <option [ngValue]="false">Inactivo</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save">Guardar</button>
            <button type="button" class="btn-cancel" (click)="cancelForm()">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div class="facultad-table">
        <table>
          <thead>
            <tr>
             <!-- <th>ID</th>-->
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let facultad of facultades">
              <!--<td>{{ facultad.id }}</td>-->
              <td>{{ facultad.nombre }}</td>
              <td>
                <span
                  [class]="
                    'status-badge ' +
                    (facultad.estado ? 'active' : 'inactive')
                  "
                >
                  {{ facultad.estado ? "Activo" : "Inactivo" }}
                </span>
              </td>
              <td class="actions">
                <button (click)="editFacultad(facultad)" class="btn-edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  (click)="deleteFacultad(facultad.id)"
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
  styles: [
    `
      .facultad-management {
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
      .facultad-form {
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
      .facultad-table {
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
      .btn-delete:hover,
      .status-badge.active:hover,
      .status-badge.inactive:hover {
        transition: background-color 0.3s ease, color 0.3s ease;
      }
    `,
  ],
})
export default class FacultadManagementComponent implements OnInit {
  facultades: Facultad[] = [];
  showForm = false;
  editingFacultad: Facultad | null = null;

  formData: Partial<Facultad> = {
    nombre: "",
    estado: true,
  };

  private FacultadService = inject(FacultadService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    nombre: ["", [Validators.required]],
    estado: [true, [Validators.required]],
  });

  ngOnInit(): void {
    this.loadFacultades();
  }

  loadFacultades() {
    this.FacultadService.list().subscribe({
      next: (facultades) => (this.facultades = facultades),
      error: (err) => console.error("Error al cargar facultades:", err),
    });
  }

  showAddForm() {
    this.showForm = true;
    this.editingFacultad = null;
    this.form.reset({ nombre: "", estado: true });
  }

  cancelForm() {
    this.showForm = false;
    this.editingFacultad = null;
    this.form.reset();
  }

  editFacultad(facultad: Facultad) {
    this.showForm = true;
    this.editingFacultad = facultad;
    this.form.patchValue({
      nombre: facultad.nombre,
      estado: facultad.estado,
    });
  }

  deleteFacultad(id: number) {
    if (confirm("¿Está seguro de eliminar esta facultad?")) {
      this.FacultadService.delete(id).subscribe({
        next: () => {
          alert("Facultad eliminada con éxito");
          this.loadFacultades();
        },
        error: (err) => {
          console.error("Error al eliminar:", err);
          alert("Hubo un error al eliminar la facultad");
        },
      });
    }
  }

  create() {
    const nuevaFacultad = {
      nombre: this.form.get("nombre")?.value,
      estado: this.form.get("estado")?.value,
    } as Facultad;

    if (this.editingFacultad) {
      this.FacultadService.update(this.editingFacultad.id, nuevaFacultad).subscribe({
        next: () => {
          alert("Facultad actualizada con éxito");
          this.loadFacultades();
          this.showForm = false;
        },
        error: (err) => {
          console.error("Error al actualizar:", err);
          alert("Hubo un error al actualizar la facultad");
        },
      });
    } else {
      this.FacultadService.create(nuevaFacultad).subscribe({
        next: () => {
          alert("Facultad creada con éxito");
          this.loadFacultades();
          this.showForm = false;
        },
        error: (err) => {
          console.error("Error al crear:", err);
          alert("Hubo un error al crear la facultad");
        },
      });
    }
  }
}
