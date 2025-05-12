import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NotaService } from 'src/app/services/nota.service';
import { Nota } from 'src/app/models/nota.model';
import { CursoService } from "src/app/services/curso.service";


@Component({
  selector: 'app-nota-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="nota-management">
      <div class="header">
        <h1>Gestionar Notas</h1>
        <button class="btn-add" (click)="showAddForm()">Agregar Nota</button>
      </div>

      <div *ngIf="showForm" class="nota-form">
        <h2>{{ editingNota ? 'Editar' : 'Agregar' }} Nota</h2>

        <form [formGroup]="form" (ngSubmit)="create()">
          <div class="form-group">
            <label for="p1">Parcial 1:</label>
            <input type="number" id="p1" formControlName="p1" required />
          </div>
          <div class="form-group">
            <label for="p2">Parcial 2:</label>
            <input type="number" id="p2" formControlName="p2" required />
          </div>
          <div class="form-group">
            <label for="definitiva">Definitiva:</label>
            <input type="number" id="definitiva" formControlName="definitiva" required />
          </div>
          <div class="form-group">
            <label for="cursoId">Curso:</label>
            <select id="cursoId" formControlName="cursoId" required>
              <option *ngFor="let curso of cursos" [value]="curso.id">{{ curso.nombre }}</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save" [disabled]="form.invalid">Guardar</button>
            <button type="button" class="btn-cancel" (click)="cancelForm()">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="nota-table">
        <table>
          <thead>
            <tr>
              <th>Parcial 1</th>
              <th>Parcial 2</th>
              <th>Definitiva</th>
              <th>Curso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let nota of notas">
              <td>{{ nota.p1 }}</td>
              <td>{{ nota.p2 }}</td>
              <td>{{ nota.definitiva }}</td>
              <td>{{ nota.curso?.nombre }}</td>
              <td>
                <button (click)="editNota(nota)" class="btn-edit"><i class="fas fa-edit"></i></button>
                <button (click)="deleteNota(nota.id)" class="btn-delete"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`.nota-management {
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
  .nota-form {
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
  .nota-table {
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
`],
})
export class NotaManagementComponent implements OnInit {
  notas: Nota[] = [];
  cursos: any[] = []; // Cambia "any" por el tipo específico si tienes definido el modelo `Curso`
  showForm = false;
  editingNota: Nota | null = null;

  form: FormGroup;

  private notaService = inject(NotaService);
  private cursoService = inject(CursoService);
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      p1: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      p2: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      definitiva: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      cursoId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadNotas();
    this.loadCursos();
  }

  loadNotas() {
    this.notaService.list().subscribe({
      next: (notas) => (this.notas = notas),
      error: (err) => console.error('Error al cargar notas:', err),
    });
  }

  loadCursos() {
    this.cursoService.list().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      },
      error: (err) => {
        console.error("Error al cargar los cursos:", err);
        alert("Hubo un error al cargar los cursos.");
      },
    });
  }

  showAddForm() {
    this.showForm = true;
    this.editingNota = null;
    this.form.reset();
  }

  create() {
    if (this.form.valid) {
      const notaData = this.form.value;
      if (this.editingNota) {
        this.notaService.update(this.editingNota.id, notaData).subscribe({
          next: () => {
            alert('Nota actualizada con éxito');
            this.loadNotas();
            this.showForm = false;
          },
          error: (err) => {
            console.error('Error al actualizar nota:', err);
            alert('Hubo un error al actualizar la nota');
          },
        });
      } else {
        this.notaService.create(notaData).subscribe({
          next: () => {
            alert('Nota creada con éxito');
            this.loadNotas();
            this.showForm = false;
          },
          error: (err) => {
            console.error('Error al crear nota:', err);
            alert('Hubo un error al crear la nota');
          },
        });
      }
    }
  }

  editNota(nota: Nota) {
    this.showForm = true;
    this.editingNota = nota;
    this.form.patchValue({ ...nota, cursoId: nota.curso?.id || null });
  }

  deleteNota(id: number) {
    if (confirm('¿Estás seguro de eliminar esta nota?')) {
      this.notaService.delete(id).subscribe({
        next: () => {
          alert('Nota eliminada con éxito');
          this.loadNotas();
        },
        error: (err) => {
          console.error('Error al eliminar nota:', err);
          alert('Hubo un error al eliminar la nota');
        },
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.editingNota = null;
    this.form.reset();
  }
}
