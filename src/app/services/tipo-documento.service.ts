import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Observable, of } from 'rxjs';
import { TipoDocumento } from '../models/tipo-documento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private http = inject(HttpClient);
  
  // Mock data
  private mockDocumentos: TipoDocumento[] = [
    { id: 1, nombre: 'Cédula de Ciudadanía', estado: true },
    { id: 2, nombre: 'Tarjeta de Identidad', estado: true },
    { id: 3, nombre: 'Pasaporte', estado: true },
    { id: 4, nombre: 'Cédula de Extranjería', estado: true }
  ];

  list(): Observable<TipoDocumento[]> {
    // Return mock data instead of making HTTP request
    return of(this.mockDocumentos);
  }

  get(id: number): Observable<TipoDocumento> {
    const documento = this.mockDocumentos.find(d => d.id === id);
    return of(documento as TipoDocumento);
  }

  create(documento: any): Observable<TipoDocumento> {
    const newDoc = {
      ...documento,
      id: this.mockDocumentos.length + 1
    };
    this.mockDocumentos.push(newDoc);
    return of(newDoc);
  }

  update(id: number, documento: any): Observable<TipoDocumento> {
    const index = this.mockDocumentos.findIndex(d => d.id === id);
    if (index !== -1) {
      this.mockDocumentos[index] = { ...this.mockDocumentos[index], ...documento };
      return of(this.mockDocumentos[index]);
    }
    return of({} as TipoDocumento);
  }

  delete(id: number): Observable<void> {
    const index = this.mockDocumentos.findIndex(d => d.id === id);
    if (index !== -1) {
      this.mockDocumentos.splice(index, 1);
    }
    return of(void 0);
  }
}