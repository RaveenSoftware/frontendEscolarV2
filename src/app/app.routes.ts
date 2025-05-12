import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentManagementComponent } from './components/students/student-management.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import TipoGeneroManagementComponent from './components/tipo-genero/tipo-genero-managment.components';
import TipoDocumentoManagementComponent from './components/tipo-documento/tipo-documento-managment.components';
import { AsignaturaManagementComponent } from './components/asignaturas/asignatura.component';
import FacultadManagementComponent from './components/Facultad/faculty.component';
import { PersonaManagementComponent } from './components/persona/persona.component';
import { TeacherManagementComponent } from './components/teacher/teacher-managment.component';
import { PensumManagementComponent } from './components/pensum/pensum.component';
import { SemestreAcademicoManagementComponent } from './components/semestre-academico/semestre-academico.componente';
import { AsesoriaManagementComponent } from './components/asesorias/asesoria.component';
import { CursoManagementComponent } from './components/curso/curso.component';
import { AulaManagementComponent } from './components/aula/aula.component';
import HorarioManagementComponent from './components/horario/horario.component';
import { AulaHorarioManagementComponent } from './components/aula-horario/aula-horario.component';
import { NotaManagementComponent } from './components/nota/nota.component';
import { PoligrafoManagementComponent } from './components/poligrafo/poligrafo.component';
import { RolManagementComponent } from './components/rol/rol-management.component';
import { ProgramaAcademicoComponent } from './components/programa-academico/programa-academico.component';

export const routes: Routes = [
  // Solo el componente de login se carga para esta ruta
  { path: 'login', component: LoginComponent },

  // Rutas protegidas por AuthGuard
  { path: 'admin-dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { userType: 'admin' }},
  { path: 'students', component: StudentManagementComponent, canActivate: [AuthGuard], data: { userType: 'admin' }},
  { path: 'teacher-dashboard', component: StudentManagementComponent, canActivate: [AuthGuard], data: { userType: 'teacher' }},
  { path: 'tipo-genero', component: TipoGeneroManagementComponent, canActivate: [AuthGuard], data: { userType: 'admin' }},
  { path: 'tipo-documento', component: TipoDocumentoManagementComponent, canActivate: [AuthGuard], data: { userType: 'admin' }},
  { path: 'asignaturas' , component: AsignaturaManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'pensums' , component: PensumManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'semestreAcademicos' , component: SemestreAcademicoManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'cursos' , component: CursoManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'asesorias' , component: AsesoriaManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'facultad' , component: FacultadManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'persona' , component: PersonaManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'teacher' , component: TeacherManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'aula' , component: AulaManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'horario' , component: HorarioManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'aula-horario' , component: AulaHorarioManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'nota' , component: NotaManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'poligrafo' , component: PoligrafoManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'roles' , component: RolManagementComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},
  { path: 'programas' , component: ProgramaAcademicoComponent, canActivate:[AuthGuard], data: {userType: 'admin'}},

  // Ruta por defecto redirige al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Redirige a login para cualquier ruta no definida
  { path: '**', redirectTo: 'login' }
];