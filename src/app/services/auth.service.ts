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
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('numeroDocumento', numeroDocumento);
    body.set('password', password);
    
    return this.http.post(this.apiUrl, body.toString(), { headers });
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