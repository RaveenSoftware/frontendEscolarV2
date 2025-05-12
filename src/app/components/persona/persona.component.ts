import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PersonaService } from "src/app/services/persona.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Persona } from "src/app/models/persona.model";
import { TipoDocumentoService } from "src/app/services/tipo-documento.service";
import { TipoGeneroService } from "src/app/services/tipo-genero.service";

@Component({
  selector: "app-persona-management",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="persona-management">
      <div class="header">
        <h1>Gestionar Personas</h1>
        <button class="btn-add" (click)="showAddForm()">
          <i class="fas fa-plus"></i> Agregar Persona
        </button>
      </div>

      <div *ngIf="showForm" class="persona-form">
        <h2>{{ editingPersona ? "Editar" : "Agregar" }} Persona</h2>

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
            <label for="correoPersonal">Correo:</label>
            <input id="correoPersonal" formControlName="correoPersonal" required />
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

      <div class="persona-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Tipo Documento</th>
              <th>Género</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let persona of personas">
              <td>{{ persona.nombre }}</td>
              <td>{{ persona.telefono }}</td>
              <td>{{ persona.correoPersonal }}</td>
              <td>{{ persona.tipoDocumento?.nombre }}</td>
              <td>{{ persona.genero?.nombre }}</td>
              <td>
                <span
                  [class]="
                    'status-badge ' +
                    (persona.estado ? 'active' : 'inactive')
                  "
                >
                  {{ persona.estado ? "Activo" : "Inactivo" }}
                </span>
              </td>
              <td class="actions">
                <button (click)="editPersona(persona)" class="btn-edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  (click)="deletePersona(persona.id)"
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
    .persona-management {
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
    .persona-form {
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
    .persona-table {
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
  `]
})
export class PersonaManagementComponent implements OnInit {
  personas: Persona[] = [];
  showForm = false;
  editingPersona: Persona | null = null;

  tiposDocumento: any[] = [];
  generos: any[] = [];

  form: FormGroup;

  private personaService = inject(PersonaService);
  private tipoDocumentoService = inject(TipoDocumentoService);
  private tipoGeneroService = inject(TipoGeneroService);
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      correoPersonal: ["", [Validators.required, Validators.email]],
      fechaNacimiento: ["", [Validators.required]],
      numeroDocumento: ["", [Validators.required]],
      tipoDocumentoId: [null, [Validators.required]],
      generoId: [null, [Validators.required]],
      estado: [true],
    });
  }

  ngOnInit(): void {
    this.loadPersonas();
    this.loadTiposDocumento();
    this.loadGeneros();
  }

  loadPersonas() {
    this.personaService.list().subscribe({
      next: (personas) => (this.personas = personas),
      error: (err) => console.error("Error al cargar personas:", err),
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

  showAddForm() {
    this.showForm = true;
    this.editingPersona = null;
    this.form.reset({ estado: true });
  }

  create() {
    if (this.form.valid) {
      const personaData = this.form.value;
      if (this.editingPersona) {
        this.personaService.update(this.editingPersona.id, personaData).subscribe({
          next: () => {
            alert("Persona actualizada con éxito");
            this.loadPersonas();
            this.showForm = false;
          },
          error: (err) => {
            console.error("Error al actualizar:", err);
            alert("Hubo un error al actualizar la persona");
          },
        });
      } else {
        this.personaService.create(personaData).subscribe({
          next: () => {
            alert("Persona creada con éxito");
            this.loadPersonas();
            this.showForm = false;
          },
          error: (err) => {
            console.error("Error al crear:", err);
            alert("Hubo un error al crear la persona");
          },
        });
      }
    }
  }

  editPersona(persona: Persona) {
    this.showForm = true;
    this.editingPersona = persona;
    
    this.form.patchValue({
      ...persona,
      tipoDocumentoId: persona.tipoDocumento?.id || null,
      generoId: persona.genero?.id || null,
    });
  }

  deletePersona(id: number) {
    if (confirm("¿Estás seguro de eliminar esta persona?")) {
      this.personaService.delete(id).subscribe({
        next: () => {
          alert("Persona eliminada con éxito");
          this.loadPersonas();
        },
        error: (err) => {
          console.error("Error al eliminar:", err);
          alert("Hubo un error al eliminar la persona");
        },
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.editingPersona = null;
    this.form.reset();
  }
}