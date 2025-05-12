// src/app/models/asesoria.model.ts
//import { Curso } from './curso.model';
import { Teacher } from './teacher.model';
import { Student } from './student.model';
import { Curso } from './curso.model';

export interface Asesoria {
  id: number;
  tema?: string;
  cursoId?: number;
  curso?: Curso;
  horaInicio?: string; // Usamos string para LocalTime
  horaFin?: string; // Usamos string para LocalTime
  docente?: Teacher;
  docenteId?: string; // Nueva propiedad
}