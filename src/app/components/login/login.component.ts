import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="login-section">
        <div class="form-container">
          <div class="university-header">
            <img src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg" alt="University Campus" class="campus-image" />
            <div class="overlay"></div>
            <h1 class="animate-slideDown">Sistema Académico</h1>
            <p class="subtitle animate-slideDown animation-delay-200">
              Universidad de Excelencia
            </p>
          </div>
          <form class="animate-slideUp animation-delay-400" (ngSubmit)="login()">
            <div class="input-container">
              <i class="fas fa-user"></i>
              <input
                type="text"
                placeholder="Número de Documento"
                [(ngModel)]="numeroDocumento"
                name="numeroDocumento"
                class="input-focus-effect"
                required
              />
            </div>
            <div class="input-container">
              <i class="fas fa-lock"></i>
              <input
                [type]="isPasswordVisible ? 'text' : 'password'"
                placeholder="Contraseña"
                [(ngModel)]="password"
                name="password"
                id="password"
                class="input-focus-effect"
                required
              />
              <button
                type="button"
                class="password-toggle"
                [class.show]="isPasswordVisible"
                (click)="togglePassword()"
              >
                <i [class]="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div class="checkbox-container">
              <label class="custom-checkbox">
                <input type="checkbox" id="keep-session" />
                <span class="checkmark"></span>
                <span class="checkbox-text">Mantener sesión iniciada</span>
              </label>
              <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit" class="login-button button-hover-effect animate-pulse">
              <i class="fas fa-sign-in-alt"></i> Ingresar al Sistema
            </button>
          </form>
          <p class="error-message" *ngIf="message">{{ message }}</p>
        </div>
        <div class="footer">
          <div class="social-icons">
            <a href="#" class="social-icon-hover">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#" class="social-icon-hover">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon-hover">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-icon-hover">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
          <div class="footer-info">
            <p>© 2025 Universidad de Excelencia</p>
            <p>Institución de Educación Superior</p>
            <p>Vigilada por el Ministerio de Educación Nacional</p>
          </div>
        </div>
      </div>
      <div class="info-section">
        <div class="info-content">
          <h2>Bienvenido al Sistema Académico</h2>
          <div class="feature-grid">
            <div class="feature-item">
              <i class="fas fa-graduation-cap"></i>
              <h3>Gestión Académica</h3>
              <p>Accede a tus calificaciones y horarios</p>
            </div>
            <div class="feature-item">
              <i class="fas fa-book-reader"></i>
              <h3>Recursos Educativos</h3>
              <p>Biblioteca digital y material de estudio</p>
            </div>
            <div class="feature-item">
              <i class="fas fa-calendar-alt"></i>
              <h3>Calendario Académico</h3>
              <p>Mantente al día con las actividades</p>
            </div>
            <div class="feature-item">
              <i class="fas fa-users"></i>
              <h3>Comunidad Universitaria</h3>
              <p>Conecta con estudiantes y docentes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideDown {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
    
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow-x: hidden;
    }
    
    .container {
      display: flex;
      width: 100%;
      height: 100vh;
      background: #f5f5f5;
    }
    
    .login-section {
      width: 40%;
      background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
      color: white;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow-y: auto;
    }
    
    .info-section {
      width: 60%;
      background: white;
      padding: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .university-header {
      position: relative;
      text-align: center;
      padding: 2rem 0;
      margin-bottom: 2rem;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .campus-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(26, 35, 126, 0.7);
      z-index: 2;
    }
    
    .university-header h1,
    .university-header p {
      position: relative;
      z-index: 3;
    }
    
    .form-container {
      background: rgba(255, 255, 255, 0.1);
      padding: 2rem;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: white;
    }
    
    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 2rem;
    }
    
    .input-container {
      position: relative;
      margin-bottom: 1.5rem;
    }
    
    .input-container i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #90caf9;
    }
    
    input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      color: white;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    
    input::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    
    input:focus {
      border-color: #90caf9;
      box-shadow: 0 0 0 2px rgba(144, 202, 249, 0.2);
      outline: none;
    }
    
    .password-toggle {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #90caf9;
      cursor: pointer;
      padding: 0;
    }
    
    .checkbox-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .custom-checkbox {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    
    .checkmark {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      margin-right: 0.5rem;
      position: relative;
      transition: all 0.3s ease;
    }
    
    .custom-checkbox input:checked ~ .checkmark {
      background: #90caf9;
      border-color: #90caf9;
    }
    
    .login-button {
      width: 100%;
      padding: 1rem;
      background: #90caf9;
      color: #1a237e;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .login-button:hover {
      background: #64b5f6;
      transform: translateY(-2px);
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin-top: 3rem;
    }
    
    .feature-item {
      text-align: center;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 10px;
      transition: all 0.3s ease;
    }
    
    .feature-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .feature-item i {
      font-size: 2.5rem;
      color: #1a237e;
      margin-bottom: 1rem;
    }
    
    .feature-item h3 {
      color: #1a237e;
      margin-bottom: 0.5rem;
    }
    
    .feature-item p {
      color: #666;
    }
    
    .social-icons {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .social-icons a {
      color: white;
      font-size: 1.5rem;
      opacity: 0.7;
      transition: all 0.3s ease;
    }
    
    .social-icons a:hover {
      opacity: 1;
      transform: translateY(-3px);
    }
    
    .footer-info {
      text-align: center;
      font-size: 0.9rem;
      opacity: 0.7;
    }
    
    .footer-info p {
      margin: 0.3rem 0;
    }
    
    @media (max-width: 1024px) {
      .container {
        flex-direction: column;
      }
      
      .login-section,
      .info-section {
        width: 100%;
      }
      
      .info-section {
        padding: 2rem;
      }
      
      .feature-grid {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 768px) {
      .login-section {
        padding: 1rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .feature-item {
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  numeroDocumento: string = '';
  password: string = '';
  message: string = '';
  isPasswordVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Bypass authentication and directly navigate to admin dashboard
    localStorage.setItem('authToken', 'true');
    localStorage.setItem('userType', 'admin');
    this.authService.updateAuthStatus(true);
    this.router.navigate(['/admin-dashboard']);
  }

  togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}