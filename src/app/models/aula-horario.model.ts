import { Aula } from './aula.model';
import { Horario } from './horario.model';
import { Curso } from './curso.model';

export interface AulaHorario {
  id: number;
  aulaId?: number;  
  aula?: Aula;      
  horarioId?: number; 
  horario?: Horario; 
  estado?: boolean;
  cursoId?: number;   
  curso?: Curso;     
}
