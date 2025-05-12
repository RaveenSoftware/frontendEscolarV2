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
          <h1 class="animate-slideDown">Bienvenido!</h1>
          <p class="subtitle animate-slideDown animation-delay-200">
            Portal Universitario para Usuarios
          </p>
          <form class="animate-slideUp animation-delay-400" (ngSubmit)="login()">
            <div class="input-container">
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
                id="togglePassword"
                class="password-toggle"
                [class.show]="isPasswordVisible"
                (click)="togglePassword()"
              ></button>
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
              Iniciar
            </button>
          </form>
          <p class="error-message" *ngIf="message">{{ message }}</p>
        </div>
        <div class="footer">
          <div class="social-icons">
            <a href="https://www.facebook.com/UdesCucutaOficial" class="social-icon-hover">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png"
                alt="Facebook"
              />
            </a>
            <a href="https://www.instagram.com/udescampuscucuta/" class="social-icon-hover">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png"
                alt="Instagram"
              />
            </a>
          </div>
          <p>Universidad de Santander UDES, Vigilada Mineducación</p>
          <p>
            Resolución otorgada por el Ministerio de Educación Nacional No. 6216 del 22 de diciembre de 2005 / Personería
            jurídica 810 de 19/12/96
          </p>
          <p>
            Institución de Educación Superior sujeta a inspección y vigilancia por el Ministerio de Educación Nacional
            Resolución 12220 de 2016
          </p>
        </div>
      </div>
      <div class="image-section" style="background-image: url('assets/fondo.png');">
        <img src="assets/logoudes.png" alt="University Logo" class="logo hover-scale" />
      </div>
    </div>
  `,
  styles: [`@keyframes fadeIn {
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
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
  }
  
  body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: Arial, sans-serif;
      overflow-x: hidden;
  }
  
  .container {
      display: flex;
      width: 100%;
      height: 100vh;
      min-height: 100vh;
  }
  
  .login-section {
      width: 50%;
      background-color: #0E2B4A;
      color: white;
      padding: 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      animation: fadeIn 0.8s ease-out;
  }
  
  .image-section {
      width: 50%;
      background-image: url('/assets/logo.png');
      background-size: cover;
      background-position: center;
      position: relative;
      height: 100%;
  }
  
  h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
  }
  
  .subtitle {
      margin-bottom: 30px;
  }
  
  .form-container {
      margin-top: 20%;
  }
  
  .animate-slideDown {
      animation: slideDown 0.6s ease-out;
  }
  
  .animate-slideUp {
      animation: slideUp 0.6s ease-out;
  }
  
  .animate-pulse {
      animation: pulse 2s infinite;
  }
  
  .animation-delay-200 {
      animation-delay: 200ms;
  }
  
  .animation-delay-400 {
      animation-delay: 400ms;
  }
  
  input {
      width: 100%;
      height: 60px;
      padding: 10px;
      margin-bottom: 15px;
      background-color: #2a3c5e;
      border: none;
      color: white;
      box-sizing: border-box;
  }
  
  input::placeholder {
      color: #aaa;
  }
  
  .input-container {
      position: relative;
  }
  
  .password-toggle {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: white;
      cursor: pointer;
  }
  
  .password-toggle::before {
      content: '👁';
  }
  
  .password-toggle.show::before {
      content: '👁‍🗨';
  }
  
  .checkbox-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
  }
  
  .custom-checkbox {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 35px;
      cursor: pointer;
      font-size: 16px;
      user-select: none;
      transition: opacity 0.3s ease;
  }
  
  .custom-checkbox input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
  }
  
  .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: #2a3c5e;
      border-radius: 4px;
      transition: all 0.3s ease;
  }
  
  .custom-checkbox:hover input ~ .checkmark {
      background-color: #3a4c6e;
  }
  
  .custom-checkbox input:checked ~ .checkmark {
      background-color: #f0a500;
  }
  
  .checkmark:after {
      content: "";
      position: absolute;
      display: none;
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
      transition: all 0.3s ease;
  }
  
  .custom-checkbox input:checked ~ .checkmark:after {
      display: block;
  }
  
  .checkbox-text {
      margin-left: 10px;
      transition: color 0.3s ease;
  }
  
  .custom-checkbox:hover .checkbox-text {
      color: #f0a500;
  }
  
  .forgot-password {
      color: #aaa;
      text-decoration: none;
      font-size: 0.9em;
      transition: color 0.3s ease;
  }
  
  .forgot-password:hover {
      color: #f0a500;
  }
  
  .login-button {
      background-color: #f0a500;
      color: white;
      border: none;
      padding: 15px;
      width: 100%;
      cursor: pointer;
      font-weight: bold;
      font-size: 1em;
  }
  
  .social-icons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
  }
  
  .social-icons img {
      width: 24px;
      height: 24px;
  }
  
  .logo {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 100px;
  }
  
  .footer {
      font-size: 0.8em;
      color: #3E556E;
      text-align: center;
  }
  
  .input-focus-effect {
      transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  
  .input-focus-effect:focus {
      box-shadow: 0 0 0 2px rgba(240, 165, 0, 0.5);
      transform: translateY(-2px);
      outline: none;
  }
  
  .button-hover-effect {
      transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .button-hover-effect:hover {
      background-color: #ffc107;
      transform: translateY(-2px);
  }
  
  .social-icon-hover {
      transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .social-icon-hover:hover {
      transform: translateY(-3px);
      opacity: 0.8;
  }
  
  .hover-scale {
      transition: transform 0.3s ease;
  }
  
  .hover-scale:hover {
      transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
      .container {
          flex-direction: column;
      }
      .login-section, .image-section {
          width: 100%;
      }
      .image-section {
          height: 200px;
      }
      .form-container {
          margin-top: 10%;
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