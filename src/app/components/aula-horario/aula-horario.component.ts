import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AulaHorarioService } from "src/app/services/aula-horario.service";
import { AulaHorario } from "src/app/models/aula-horario.model";
import { AulaService } from "src/app/services/aula.service";
import { HorarioService } from "src/app/services/horario.service";
import { CursoService } from "src/app/services/curso.service";

@Component({
  selector: "app-aula-horario-management",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `<div class="aula-horario-management">
    <h2>Aula-Horarios</h2>

    <button class="btn btn-primary mb-3" (click)="showAddForm()">
      Agregar Aula-Horario
    </button>

    
    <div *ngIf="showForm" class="card mt-4">
      <div class="card-body">
        <h3 *ngIf="!editingAulaHorario">Agregar Aula-Horario</h3>
        <h3 *ngIf="editingAulaHorario">Editar Aula-Horario</h3>

        <form [formGroup]="form" (ngSubmit)="create()">
          
          <div class="form-group">
            <label for="aulaId">Aula</label>
            <select
              id="aulaId"
              class="form-control"
              formControlName="aulaId"
              required
            >
              <option value="" disabled>Seleccione un aula</option>
              <option *ngFor="let aula of aulas" [value]="aula.id">
                {{ aula.nombre }}
              </option>
            </select>
            <div
              *ngIf="form.get('aulaId')?.invalid && form.get('aulaId')?.touched"
              class="text-danger"
            >
              El aula es requerida.
            </div>
          </div>

          
          <div class="form-group">
            <label for="horarioId">Horario</label>
            <select
              id="horarioId"
              class="form-control"
              formControlName="horarioId"
              required
            >
              <option value="" disabled>Seleccione un horario</option>
              <option *ngFor="let horario of horarios" [value]="horario.id">
                {{ horario.horaInicio }}
              </option>
            </select>
            <div
              *ngIf="
                form.get('horarioId')?.invalid && form.get('horarioId')?.touched
              "
              class="text-danger"
            >
              El horario es requerido.
            </div>
          </div>

          
          <!--<div class="form-group">
            <label for="cursoId">Curso</label>
            <select
              id="cursoId"
              class="form-control"
              formControlName="cursoId"
              required
            >
              <option value="" disabled>Seleccione un curso</option>
              <option *ngFor="let curso of cursos" [value]="curso.id">
                {{ curso.nombre }}
              </option>
            </select>
            <div
              *ngIf="
                form.get('cursoId')?.invalid && form.get('cursoId')?.touched
              "
              class="text-danger"
            >
              El curso es requerido.
            </div>
          </div>-->

          
          <div class="form-group">
            <label for="estado">Estado</label>
            <select
              id="estado"
              class="form-control"
              formControlName="estado"
              required
            >
              <option [value]="true">Activo</option>
              <option [value]="false">Inactivo</option>
            </select>
          </div>

          
          <div class="form-group mt-3">
            <button
              type="submit"
              class="btn btn-success"
              [disabled]="form.invalid"
            >
              Guardar
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              (click)="showForm = false"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Aula</th>
          <th>Horario</th>
          <!--<th>Curso</th>-->
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let aulaHorario of aulaHorarios">
          <td>{{ aulaHorario.id }}</td>
          <td>{{ aulaHorario.aula?.nombre || "Sin asignar" }}</td>
          <td>{{ aulaHorario.horario?.horaInicio || "Sin asignar" }}</td>
          <!--<td>{{ aulaHorario.curso?.nombre || 'Sin asignar' }}</td>-->
          <td>
            <span
              [class]="
                'status-badge ' + (aulaHorario.estado ? 'active' : 'inactive')
              "
            >
              {{ aulaHorario.estado ? "Activo" : "Inactivo" }}
            </span>
          </td>
          <td class="actions">
                <button (click)="editAulaHorario(aulaHorario)" class="btn-edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  (click)="deleteAulaHorario(aulaHorario.id)"
                  class="btn-delete"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
        </tr>
      </tbody>
    </table>
  </div> `,
  styles: [
    `
      .aula-horario-management {
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
      .aula-horario-form {
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
      .aula-horario-table {
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
export class AulaHorarioManagementComponent implements OnInit {
  aulaHorarios: AulaHorario[] = [];
  showForm = false;
  editingAulaHorario: AulaHorario | null = null;

  aulas: any[] = [];
  horarios: any[] = [];
  //cursos: any[] = [];

  form: FormGroup;

  private aulaHorarioService = inject(AulaHorarioService);
  private aulaService = inject(AulaService);
  private horarioService = inject(HorarioService);
  private cursoService = inject(CursoService);
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      aulaId: [null, [Validators.required]],
      horarioId: [null, [Validators.required]],
      estado: [true, [Validators.required]],
      cursoId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadAulaHorarios();
    this.loadAulas();
    this.loadHorarios();
    //this.loadCursos();
  }

  loadAulaHorarios() {
    this.aulaHorarioService.list().subscribe({
      next: (data) => (this.aulaHorarios = data),

      error: (err) => console.error("Error al cargar aulas-horarios:", err),
    });
  }

  loadAulas() {
    this.aulaService.list().subscribe({
      next: (data) => (this.aulas = data),
      error: (err) => console.error("Error al cargar aulas:", err),
    });
  }

  loadHorarios() {
    this.horarioService.list().subscribe({
      next: (data) => (this.horarios = data),
      error: (err) => console.error("Error al cargar horarios:", err),
    });
  }

  /*loadCursos() {
    this.cursoService.list().subscribe({
    next: (data) => (this.cursos = data),
    error: (err) => console.error("Error al cargar cursos:", err),
    });
  }*/

  showAddForm() {
    this.showForm = true;
    this.editingAulaHorario = null;
    this.form.reset({ estado: true });
  }

  create() {
    if (this.form.valid) {
      const aulaHorarioData = this.form.value;
      if (this.editingAulaHorario) {
        this.aulaHorarioService
          .update(this.editingAulaHorario.id, aulaHorarioData)
          .subscribe({
            next: () => {
              alert("Aula-Horario actualizado con éxito");
              this.loadAulaHorarios();
              this.showForm = false;
            },
            error: (err) => alert("Error al actualizar Aula-Horario: " + err),
          });
      } else {
        this.aulaHorarioService.create(aulaHorarioData).subscribe({
          next: () => {
            alert("Aula-Horario creado con éxito");
            this.loadAulaHorarios();
            this.showForm = false;
          },
          error: (err) => alert("Error al crear Aula-Horario: " + err),
        });
      }
    }
  }

  editAulaHorario(aulaHorario: AulaHorario) {
    this.showForm = true;
    this.editingAulaHorario = aulaHorario;

    this.form.patchValue({
      ...aulaHorario,
      aulaId: aulaHorario.aula?.id || null,
      horarioId: aulaHorario.horario?.id || null,
      //cursoId: aulaHorario.curso?.id || null,
    });
  }

  deleteAulaHorario(id: number) {
    if (confirm("¿Estás seguro de eliminar este Aula-Horario?")) {
      this.aulaHorarioService.delete(id).subscribe({
        next: () => {
          alert("Aula-Horario eliminado con éxito");
          this.loadAulaHorarios();
        },
        error: (err) => alert("Error al eliminar Aula-Horario: " + err),
      });
    }
  }
}
