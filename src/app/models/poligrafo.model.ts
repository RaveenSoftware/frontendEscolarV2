import { Student } from './student.model';
import { Asignatura } from './asignatura.model';
import { Nota } from './nota.model';
import { SemestreAcademico } from './semestre-academico.model';

export interface Poligrafo {
  id: number;
  estudianteId?: number;
  estudiante?: Student;
  asignaturaId?: number;
  asignatura?: Asignatura;
  notaId?: number;
  nota?: Nota;
  fechaEmision?: string;
  semestreAcademicoId?: number;
  semestreAcademico?: SemestreAcademico;
  creditosMatriculados?: number;
  promedio?: number;
  creditosAcumulados?: number;
  promedioAcumulado?: string;
}
