import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Observable } from 'rxjs';
import { Facultad } from '../models/faculty.model';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  private http = inject(HttpClient);

  list() {
    return this.http.get<Facultad[]>('api/v1/facultades');
  }

  get(id: number) {
    return this.http.get<Facultad>(`api/v1/facultades/${id}`);
  }

  create(contact: any) {
    return this.http.post<Facultad>('api/v1/facultades', contact);
  }

  update(id: number, contact: any) {
    return this.http.put<Facultad>(`api/v1/facultades/${id}`, contact);
  }

  delete(id: number) {
    return this.http.delete<void>(`api/v1/facultades/${id}`);
  }
}
