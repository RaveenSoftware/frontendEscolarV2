import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/auth/login';
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  login(numeroDocumento: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { numeroDocumento, password };
    
    return this.http.post(this.apiUrl, body, { headers });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authStatus.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  updateAuthStatus(status: boolean) {
    this.authStatus.next(status);
  }
}