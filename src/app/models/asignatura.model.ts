import { Pensum } from "./pensum.model";

export interface Asignatura {
    id: number;
    codigo?: string;
    nombre?: string;
    predecesoraId?: number;
    predecesora?: Asignatura; // Puede ser null si no tiene predecesora
    numeroSemestre?: string;
    numeroCreditos?: string;
    pensumId?: number;
    pensum?: Pensum; // Aquí se supone que Pensum es otro modelo que necesitarás crear o adaptar
}