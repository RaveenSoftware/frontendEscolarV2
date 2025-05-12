import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Observable, of } from 'rxjs';
import { TipoGenero } from '../models/tipo-genero.model';

@Injectable({
  providedIn: 'root'
})
export class TipoGeneroService {
  private http = inject(HttpClient);
  
  // Mock data
  private mockGeneros: TipoGenero[] = [
    { id: 1, nombre: 'Masculino', estado: true },
    { id: 2, nombre: 'Femenino', estado: true },
    { id: 3, nombre: 'No Binario', estado: true },
    { id: 4, nombre: 'Otro', estado: true }
  ];

  list(): Observable<TipoGenero[]> {
    return of(this.mockGeneros);
  }

  get(id: number): Observable<TipoGenero> {
    const genero = this.mockGeneros.find(g => g.id === id);
    return of(genero as TipoGenero);
  }

  create(genero: any): Observable<TipoGenero> {
    const newGenero = {
      ...genero,
      id: this.mockGeneros.length + 1
    };
    this.mockGeneros.push(newGenero);
    return of(newGenero);
  }

  update(id: number, genero: any): Observable<TipoGenero> {
    const index = this.mockGeneros.findIndex(g => g.id === id);
    if (index !== -1) {
      this.mockGeneros[index] = { ...this.mockGeneros[index], ...genero };
      return of(this.mockGeneros[index]);
    }
    return of({} as TipoGenero);
  }

  delete(id: number): Observable<void> {
    const index = this.mockGeneros.findIndex(g => g.id === id);
    if (index !== -1) {
      this.mockGeneros.splice(index, 1);
    }
    return of(void 0);
  }
}