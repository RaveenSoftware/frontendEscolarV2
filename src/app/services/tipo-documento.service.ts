import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../models/tipo-documento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private http = inject(HttpClient);

  list() {
    return this.http.get<TipoDocumento[]>('api/v1/tipos_documentos');
  }

  get(id: number) {
    return this.http.get<TipoDocumento>(`api/v1/tipos_documentos/${id}`);
  }

  create(contact: any) {
    return this.http.post<TipoDocumento>('api/v1/tipos_documentos', contact);
  }

  update(id: number, contact: any) {
    return this.http.put<TipoDocumento>(`api/v1/tipos_documentos/${id}`, contact);
  }

  delete(id: number) {
    return this.http.delete<void>(`api/v1/tipos_documentos/${id}`);
  }
}
