import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../models/rol.model';

@Component({
  selector: 'app-rol-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="rol-management">
      <div class="header">
        <h1>Gestionar Roles</h1>
        <button class="btn-add" (click)="showAddForm()">
          <i class="fas fa-plus"></i> Agregar Rol
        </button>
      </div>

      <div *ngIf="showForm" class="rol-form">
        <h2>{{ editingRol ? 'Editar' : 'Agregar' }} Rol</h2>
        <form [formGroup]="form" (ngSubmit)="saveRol()">
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
            <label>Descripción:</label>
            <textarea 
              formControlName="descripcion" 
              rows="3"
            ></textarea>
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

      <div class="rol-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let rol of roles">
              <td>{{ rol.id }}</td>
              <td>{{ rol.nombre }}</td>
              <td>{{ rol.descripcion }}</td>
              <td class="actions">
                <button class="btn-edit" (click)="editRol(rol)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" (click)="deleteRol(rol.id!)">
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
    .rol-management {
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

    .rol-form {
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
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
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

    .rol-table {
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

    @media (max-width: 768px) {
      .rol-management {
        padding: 1rem;
      }
    }
  `]
})
export class RolManagementComponent implements OnInit {
  roles: Rol[] = [];
  showForm = false;
  editingRol: Rol | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['']
    });
  }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.rolService.list().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
      }
    });
  }

  showAddForm() {
    this.showForm = true;
    this.editingRol = null;
    this.form.reset();
  }

  cancelForm() {
    this.showForm = false;
    this.editingRol = null;
    this.form.reset();
  }

  editRol(rol: Rol) {
    this.showForm = true;
    this.editingRol = rol;
    this.form.patchValue({
      nombre: rol.nombre,
      descripcion: rol.descripcion
    });
  }

  saveRol() {
    if (this.form.invalid) {
      return;
    }

    const rolData = this.form.value;

    if (this.editingRol) {
      this.rolService.update(this.editingRol.id!, rolData).subscribe({
        next: () => {
          alert('Rol actualizado con éxito');
          this.loadRoles();
          this.cancelForm();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Hubo un error al actualizar el rol');
        }
      });
    } else {
      this.rolService.create(rolData).subscribe({
        next: () => {
          alert('Rol creado con éxito');
          this.loadRoles();
          this.cancelForm();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Hubo un error al crear el rol');
        }
      });
    }
  }

  deleteRol(id: number) {
    if (confirm('¿Está seguro de eliminar este rol?')) {
      this.rolService.delete(id).subscribe({
        next: () => {
          alert('Rol eliminado con éxito');
          this.loadRoles();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Hubo un error al eliminar el rol');
        }
      });
    }
  }
}