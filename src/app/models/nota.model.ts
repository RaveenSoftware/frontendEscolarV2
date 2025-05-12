export interface Nota {
    id: number;
    p1?: number;
    p2?: number;
    definitiva?: number;
    cursoId?: number;
    curso?: any; // Cambia "any" por el tipo específico si ya tienes definido el modelo `Curso`.
  }
  