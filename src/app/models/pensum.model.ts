import { Asignatura } from "./asignatura.model";

export interface Pensum {
    id: number;
    codigoPensum?: string;
    asignaturas?: Asignatura[]; // Asignaturas es una lista de objetos Asignatura
    programaAcademico?: ProgramaAcademico; //Aun no pq no tengo el componente de programaacademico
    estado?: boolean;
}

export interface ProgramaAcademico{
    id: number;
}