import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';
import { TipoGenero } from '../models/tipo-genero.model';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {

  private apiUrl = 'api/v1/personas'; // URL del backend

  constructor(private http: HttpClient) { }

  list(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  create(persona: Persona): Observable<Persona> {
    this.consultarLosId(persona);
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  update(id: number, persona: Persona): Observable<Persona> {
    this.consultarLosId(persona); 
    return this.http.put<Persona>(`${this.apiUrl}/${id}`, persona);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //getTiposDocumento(): Observable<string[]> {
  // return this.http.get<string[]>(`${this.apiUrl}/tiposDocumento`);
  //}

  //getGeneros(): Observable<string[]> {
  // return this.http.get<string[]>(`${this.apiUrl}/generos`);
  //}

  // Método privado para mapear IDs a objetos
  private consultarLosId(persona: Persona): void {
    persona.tipoDocumento = { id: Number(persona.tipoDocumentoId) };
    persona.genero = { id: Number(persona.generoId) };
  }
}
