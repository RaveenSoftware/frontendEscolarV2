export interface Horario {
    id: number;
    horaInicio?: string; // Usamos string para Time (puedes usar cualquier formato soportado)
    horafinalizacion?: string;
    dia?: string;
    estado?: boolean;
  }