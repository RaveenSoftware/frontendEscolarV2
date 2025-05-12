import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoligrafoService } from 'src/app/services/poligrafo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Poligrafo } from 'src/app/models/poligrafo.model';
//import { EstudianteService } from 'src/app/services/estudiante.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { NotaService } from 'src/app/services/nota.service';
import { SemestreAcademicoService } from 'src/app/services/semestre-academico.service';

@Component({
  selector: 'app-poligrafo-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="poligrafo-management">
      <div class="header">
        <h1>Gestionar Polígrafos</h1>
        <button class="btn-add" (click)="showAddForm()">
          <i class="fas fa-plus"></i> Agregar Polígrafo
        </button>
      </div>

      <div *ngIf="showForm" class="poligrafo-form">
        <h2>{{ editingPoligrafo ? "Editar" : "Agregar" }} Polígrafo</h2>

        <form [formGroup]="form" (ngSubmit)="create()">
          <div class="form-group">
            <label for="estudianteId">Estudiante:</label>
            <select id="estudianteId" formControlName="estudianteId" >
              <!--<option *ngFor="let estudiante of estudiantes" [value]="estudiante.id">
                {{ estudiante.nombre }}
              </option>-->
              <option value="27">27</option>
            </select>
          </div>

          <div class="form-group">
            <label for="asignaturaId">Asignatura:</label>
            <select id="asignaturaId" formControlName="asignaturaId" required>
              <option *ngFor="let asignatura of asignaturas" [value]="asignatura.id">
                {{ asignatura.nombre }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="notaId">Nota:</label>
            <select id="notaId" formControlName="notaId" required>
              <option *ngFor="let nota of notas" [value]="nota.id">
                {{ nota.definitiva }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="semestreAcademicoId">Semestre:</label>
            <select id="semestreAcademicoId" formControlName="semestreAcademicoId" required>
              <option *ngFor="let semestre of semestres" [value]="semestre.id">
                {{ semestre.descripcion }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="fechaEmision">Fecha de Emisión:</label>
            <input type="date" id="fechaEmision" formControlName="fechaEmision" required />
          </div>

          <div class="form-group">
            <label for="creditosMatriculados">Créditos Matriculados:</label>
            <input type="number" id="creditosMatriculados" formControlName="creditosMatriculados" required />
          </div>

          <div class="form-group">
            <label for="promedio">Promedio:</label>
            <input type="number" id="promedio" formControlName="promedio" step="0.01" required />
          </div>

          <div class="form-group">
            <label for="promedioAcumulado">Promedio Acumulado:</label>
            <input type="number" id="promedio" formControlName="promedioAcumulado" step="0.01" required />
          </div>

          <div class="form-group">
            <label for="creditosAcumulados">Créditos Acumulados:</label>
            <input type="number" id="creditosAcumulados" formControlName="creditosAcumulados" required />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-save" [disabled]="form.invalid">Guardar</button>
            <button type="button" class="btn-cancel" (click)="cancelForm()">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="poligrafo-table">
        <table>
          <thead>
            <tr>
              <!--<th>Estudiante</th>-->
              <th>Asignatura</th>
              <th>Nota</th>
              <th>Fecha de Emisión</th>
              <th>Promedio</th>
              <th>Promedio Acumulado</th>
              <th>Semestre Academico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let poligrafo of poligrafos">
              <!--<td>{{ poligrafo.estudiante?.nombre }}</td>-->
              <td>{{ poligrafo.asignatura?.nombre }}</td>
              <td>{{ poligrafo.nota?.definitiva }}</td>
              <td>{{ poligrafo.fechaEmision }}</td>
              <td>{{ poligrafo.promedio }}</td>
              <td>{{ poligrafo.promedioAcumulado }}</td>
              <td>{{ poligrafo.semestreAcademico?.descripcion }}</td>
              
              <td class="actions">
                <button (click)="editPoligrafo(poligrafo)" class="btn-edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  (click)="deletePoligrafo(poligrafo.id)"
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
    .poligrafo-management {
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
    .poligrafo-form {
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
    .poligrafo-table {
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
export class PoligrafoManagementComponent implements OnInit {
    poligrafos: Poligrafo[] = [];
    estudiantes: any[] = [];
    asignaturas: any[] = [];
    notas: any[] = [];
    semestres: any[] = [];
  
    showForm = false;
    editingPoligrafo: Poligrafo | null = null;
  
    form: FormGroup;
  
    constructor(
      private poligrafoService: PoligrafoService,
      //private studentService: StudentService,
      private asignaturaService: AsignaturaService,
      private notaService: NotaService,
      private semestreAcademicoService: SemestreAcademicoService,
      private fb: FormBuilder
    ) {
      this.form = this.fb.group({
        estudianteId: [27],
        asignaturaId: [null, [Validators.required]],
        notaId: [null, [Validators.required]],
        semestreAcademicoId: [null, [Validators.required]],
        fechaEmision: ["", [Validators.required]],
        creditosMatriculados: [null, [Validators.required]],
        promedio: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
        promedioAcumulado: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
        creditosAcumulados: [null, [Validators.required]],
        
      });
    }
  
    ngOnInit(): void {
      this.loadPoligrafos();
      //this.loadEstudiantes();
      this.loadAsignaturas();
      this.loadNotas();
      this.loadSemestres();
    }
  
    loadPoligrafos() {
      this.poligrafoService.list().subscribe({
        next: (poligrafos) => (this.poligrafos = poligrafos),
        error: (err) => console.error('Error al cargar polígrafos:', err),
      });
    }
  
    /*loadEstudiantes() {
      this.studentService.list().subscribe({
        next: (estudiantes) => (this.estudiantes = estudiantes),
        error: (err) => console.error('Error al cargar estudiantes:', err),
      });
    }*/
  
    loadAsignaturas() {
      this.asignaturaService.list().subscribe({
        next: (asignaturas) => (this.asignaturas = asignaturas),
        error: (err) => console.error('Error al cargar asignaturas:', err),
      });
    }
  
    loadNotas() {
      this.notaService.list().subscribe({
        next: (notas) => (this.notas = notas),
        error: (err) => console.error('Error al cargar notas:', err),
      });
    }
  
    loadSemestres() {
      this.semestreAcademicoService.list().subscribe({
        next: (semestres) => (this.semestres = semestres),
        error: (err) => console.error('Error al cargar semestres:', err),
      });
    }
  
    showAddForm() {
      this.showForm = true;
      this.editingPoligrafo = null;
      this.form.reset();
    }
  
    create() {
      if (this.form.valid) {
        const poligrafoData = this.form.value;
        console.log(this.form.value);
        if (this.editingPoligrafo) {
          this.poligrafoService.update(this.editingPoligrafo.id, poligrafoData).subscribe({
            next: () => {
              alert('Polígrafo actualizado con éxito');
              this.loadPoligrafos();
              this.showForm = false;
            },
            error: (err) => {
              console.error('Error al actualizar:', err);
              alert('Hubo un error al actualizar el polígrafo');
            },
          });
        } else {
          this.poligrafoService.create(poligrafoData).subscribe({
            next: () => {
              alert('Polígrafo creado con éxito');
              this.loadPoligrafos();
              this.showForm = false;
            },
            error: (err) => {
              console.error('Error al crear:', err);
              alert('Hubo un error al crear el polígrafo');
            },
          });
        }
      }
    }
  
    editPoligrafo(poligrafo: Poligrafo) {
      this.showForm = true;
      this.editingPoligrafo = poligrafo;
  
      this.form.patchValue({
        estudianteId: poligrafo.estudiante?.id || null,
        asignaturaId: poligrafo.asignatura?.id || null,
        notaId: poligrafo.nota?.id || null,
        semestreAcademicoId: poligrafo.semestreAcademico?.id || null,
        fechaEmision: poligrafo.fechaEmision,
        creditosMatriculados: poligrafo.creditosMatriculados,
        promedio: poligrafo.promedio,
        creditosAcumulados: poligrafo.creditosAcumulados,
      });
    }
  
    deletePoligrafo(id: number) {
      if (confirm('¿Estás seguro de eliminar este polígrafo?')) {
        this.poligrafoService.delete(id).subscribe({
          next: () => {
            alert('Polígrafo eliminado con éxito');
            this.loadPoligrafos();
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            alert('Hubo un error al eliminar el polígrafo');
          },
        });
      }
    }
  
    cancelForm() {
      this.showForm = false;
      this.editingPoligrafo = null;
      this.form.reset();
    }
  }