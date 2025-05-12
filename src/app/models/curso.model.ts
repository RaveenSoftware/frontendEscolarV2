// src/app/models/curso.model.ts
import { Teacher } from './teacher.model';
import { Asignatura } from './asignatura.model';
import { SemestreAcademico } from './semestre-academico.model';
//import { ProgramaAcademico } from './programa-academico.model';

export interface Curso {
  id: number;

  docenteId?: number;
  docente?: Teacher;
  
  nombre?: string;
  grupo?: string;

  asignaturaId?: number;
  asignatura?: Asignatura;

  //aulaHorarioId?: number;
  //aulaHorario?: AulaHorario;

  semestreAcademicoId?: number;
  semestreAcademico?: SemestreAcademico;

  //programaAcademicoId?: number;
  //programaAcademico?: ProgramaAcademico;

  //matriculaAcademicoId?: number;
  //matriculaAcademica?: MatriculaAcademica
}