import { Facultad } from './faculty.model';
import { Curso } from './curso.model';
import { Pensum } from './pensum.model';

export interface ProgramaAcademico {
  id?: number;
  codigoPrograma?: string;
  nombrePrograma?: string;
  descripcion?: string;
  estado?: boolean;
  facultad?: Facultad;
  facultadId?: number;
  creditosPrograma?: number;
  cursos?: Curso[];
  pensums?: Pensum[];
}