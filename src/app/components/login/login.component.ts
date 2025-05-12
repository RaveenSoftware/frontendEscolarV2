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
    <div class="login-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <img src="assets/logoudes.png" alt="UDES Logo" class="main-logo">
        <div class="overlay"></div>
      </div>

      <!-- Form Section -->
      <div class="form-section">
        <div class="form-container">
          <h1>¡Bienvenido!</h1>
          <p class="subtitle">Inicia sesión en tu cuenta</p>

          <form (ngSubmit)="login()" class="login-form">
            <div class="input-group">
              <label>Número de Documento</label>
              <input 
                type="text" 
                [(ngModel)]="numeroDocumento" 
                name="numeroDocumento" 
                placeholder="Ingresa tu número de documento"
                required
              >
            </div>

            <div class="input-group">
              <label>Contraseña</label>
              <div class="password-input">
                <input 
                  [type]="isPasswordVisible ? 'text' : 'password'"
                  [(ngModel)]="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  required
                >
                <button 
                  type="button" 
                  class="toggle-password"
                  (click)="togglePassword()"
                >
                  <i [class]="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <div class="options">
              <label class="remember-me">
                <input type="checkbox">
                <span>Recordarme</span>
              </label>
              <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" class="login-button">
              Iniciar Sesión
            </button>
          </form>

          <div class="footer">
            <p>Universidad de Santander UDES © 2025</p>
            <p>Vigilada Mineducación</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      height: 100vh;
      background-color: #f5f5f5;
    }

    .logo-section {
      flex: 1;
      position: relative;
      background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .main-logo {
      width: 80%;
      max-width: 400px;
      position: relative;
      z-index: 2;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('src/assets/fondo.png') center/cover;
      opacity: 0.1;
      z-index: 1;
    }

    .form-section {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: white;
    }

    .form-container {
      width: 100%;
      max-width: 400px;
    }

    h1 {
      font-size: 2rem;
      color: #1a237e;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #666;
      margin-bottom: 2rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .input-group label {
      color: #333;
      font-weight: 500;
    }

    .input-group input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .input-group input:focus {
      border-color: #1a237e;
      box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.1);
      outline: none;
    }

    .password-input {
      position: relative;
    }

    .toggle-password {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
    }

    .options {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
    }

    .forgot-password {
      color: #1a237e;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .login-button {
      background: #1a237e;
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .login-button:hover {
      background: #0d47a1;
    }

    .footer {
      margin-top: 2rem;
      text-align: center;
      color: #666;
      font-size: 0.9rem;
    }

    .footer p {
      margin: 0.25rem 0;
    }

    @media (max-width: 768px) {
      .login-container {
        flex-direction: column;
      }

      .logo-section {
        height: 200px;
      }

      .form-section {
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