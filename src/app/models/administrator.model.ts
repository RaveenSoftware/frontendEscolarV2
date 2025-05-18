import { TipoDocumento } from './tipo-documento.model';
import { TipoGenero } from './tipo-genero.model';
import { Facultad } from './faculty.model';
import { Rol } from './rol.model';

export interface Administrator {
  id?: number;
  // Personal Data
  nombre?: string;
  telefono?: string;
  correoPersonal?: string;
  fechaNacimiento?: string;
  numeroDocumento?: string;
  estado?: boolean;
  tipoDocumento?: TipoDocumento;
  tipoDocumentoId?: number;
  genero?: TipoGenero;
  generoId?: number;
  rol?: Rol;
  rolId?: number;
  
  // Academic Data
  facultad?: Facultad;
  facultadId?: number;
  codigoInstitucional?: string;
  correoInstitucional?: string;
}