import { TipoDocumento } from './tipo-documento.model'; 
import { TipoGenero } from './tipo-genero.model';  

export interface Persona {
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
}
