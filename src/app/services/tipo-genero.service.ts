import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Observable } from 'rxjs';
import { TipoGenero } from '../models/tipo-genero.model';

@Injectable({
  providedIn: 'root'
})
export class TipoGeneroService {

  private http = inject(HttpClient);

  list() {
    return this.http.get<TipoGenero[]>('api/v1/tipos_generos');
  }

  get(id: number) {
    return this.http.get<TipoGenero>(`api/v1/tipos_generos/${id}`);
  }

  create(contact: any) {
    return this.http.post<TipoGenero>('api/v1/tipos_generos', contact);
  }

  update(id: number, contact: any) {
    return this.http.put<TipoGenero>(`api/v1/tipos_generos/${id}`, contact);
  }

  delete(id: number) {
    return this.http.delete<void>(`api/v1/tipos_generos/${id}`);
  }
}
