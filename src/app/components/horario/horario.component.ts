import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HorarioService } from "src/app/services/horario.service";
import { Horario } from "src/app/models/horario.model";

@Component({
  selector: "app-horario-management",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `<div class="horario-management">
  <div class="header">
    <h1>Gestionar Horarios</h1>
    <button class="btn-add" (click)="showAddForm()">+ Agregar Horario</button>
  </div>

  <div *ngIf="showForm" class="horario-form">
    <h2>{{ editingHorario ? "Editar" : "Agregar" }} Horario</h2>
    <form [formGroup]="form" (ngSubmit)="save()">
      <div class="form-group">
        <label>Hora Inicio:</label>
        <input type="time" formControlName="horaInicio" required />
      </div>
      <div class="form-group">
        <label>Hora Finalización:</label>
        <input type="time" formControlName="horafinalizacion" required />
      </div>
      <div class="form-group">
        <label>Día:</label>
        <input type="text" formControlName="dia" required />
      </div>
      <div class="form-group">
        <label>Estado:</label>
        <select formControlName="estado">
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

  <div class="horario-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Hora Inicio</th>
          <th>Hora Finalización</th>
          <th>Día</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let horario of horarios">
          <td>{{ horario.id }}</td>
          <td>{{ horario.horaInicio }}</td>
          <td>{{ horario.horafinalizacion}}</td>
          <td>{{ horario.dia }}</td>
          <td>
            <span
              [class]="
                'status-badge ' + (horario.estado ? 'active' : 'inactive')
              "
            >
              {{ horario.estado ? "Activo" : "Inactivo" }}
            </span>
          </td>
          <td class="actions">
            <button (click)="editHorario(horario)" class="btn-edit"><i class="fas fa-edit"></i></button>
            <button (click)="deleteHorario(horario.id)" class="btn-delete"><i class="fas fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`,
  styles: [
    `.horario-management {
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
    .horario-form {
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
    .horario-table {
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
    }`,
  ],
})
export default class HorarioManagementComponent implements OnInit {
    horarios: Horario[] = [];
    showForm = false;
    editingHorario: Horario | null = null;
  
    form: FormGroup = inject(FormBuilder).group({
      horaInicio: ['', [Validators.required]],
      horafinalizacion: ['', [Validators.required]],
      dia: ['', [Validators.required]],
      estado: [true, [Validators.required]],
    });
  
    private horarioService = inject(HorarioService);
  
    ngOnInit(): void {
      this.loadHorarios();
    }
  
    loadHorarios() {
        this.horarioService.list().subscribe((data) => {
          console.log('Horarios:', data); // verificar en consola los horarios que se listan
          this.horarios = data;
        });
      }
  
    showAddForm() {
      this.showForm = true;
      this.editingHorario = null;
      this.form.reset({
        horaInicio: '',
        horafinalizacion: '',
        dia: '',
        estado: true,
      });
    }
  
    cancelForm() {
      this.showForm = false;
      this.editingHorario = null;
      this.form.reset();
    }
  
    editHorario(horario: Horario) {
        this.showForm = true;
        this.editingHorario = horario;
      
        this.form.patchValue({
          horaInicio: horario.horaInicio?.slice(0,5),
          horafinalizacion: horario.horafinalizacion?.slice(0,5),
          dia: horario.dia,
          estado: horario.estado,
        });
      }
      
  
    deleteHorario(id: number) {
      if (confirm('¿Está seguro de eliminar este horario?')) {
        this.horarioService.delete(id).subscribe(() => {
          alert('Horario eliminado con éxito');
          this.loadHorarios();
        });
      }
    }
  
    save() {
        if (this.form.invalid) {
          alert('Por favor, completa todos los campos obligatorios');
          return;
        }
      
        // Prepara los datos ajustando el formato de las horas
        const horarioData = {
          ...this.form.value,
          horaInicio: this.form.value.horaInicio.includes(':') ? `${this.form.value.horaInicio}:00` : this.form.value.horaInicio,
          horafinalizacion: this.form.value.horafinalizacion.includes(':') ? `${this.form.value.horafinalizacion}:00` : this.form.value.horafinalizacion,
        };
      
        console.log('Datos enviados:', horarioData); // Para depuración
      
        // Verifica si se está creando o editando
        if (this.editingHorario) {
          const horarioData = {
            ...this.form.value,
            horaInicio: this.form.value.horaInicio.includes(':') ? `${this.form.value.horaInicio}:00` : this.form.value.horaInicio,
            horafinalizacion: this.form.value.horafinalizacion.includes(':') ? `${this.form.value.horafinalizacion}:00` : this.form.value.horafinalizacion,
          };
          this.horarioService.update(this.editingHorario.id, horarioData).subscribe({
            next: () => {
              alert('Horario actualizado con éxito');
              this.loadHorarios();
              this.cancelForm();
            },
            error: (err) => {
              console.error('Error al actualizar horario:', err);
              alert('Error al actualizar el horario. Verifica los datos.');
            },
          });
        } else {
          this.horarioService.create(horarioData).subscribe({
            next: () => {
              alert('Horario creado con éxito');
              this.loadHorarios();
              this.cancelForm();
            },
            error: (err) => {
              console.error('Error al crear horario:', err);
              alert('Error al crear el horario. Verifica los datos.');
            },
          });
        }
      }
      
  }
