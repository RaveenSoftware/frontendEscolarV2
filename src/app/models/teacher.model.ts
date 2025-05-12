import { Facultad } from './faculty.model';
import { Persona } from './persona.model';
import { TipoDocumento } from './tipo-documento.model';
import { TipoGenero } from './tipo-genero.model';

export interface Teacher {
  id: number;
  nombre?: string;
  telefono?: string;
  correoPersonal?: string;
  fechaNacimiento?: string;
  numeroDocumento?: string;
  estado?: boolean;
  tipoDocumentoId?: number;  
  tipoDocumento?: TipoDocumento; 
  generoId?: number;           
  genero?: TipoGenero;   
  facultadId?: number; 
  facultad?: Facultad; 
  especialidad?: string; 
  codigoInstitucional?: string; 
  correoInstitucional?: string;     
}


