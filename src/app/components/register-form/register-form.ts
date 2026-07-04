import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { LoginApi } from '../../services/login-api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  userform: Usuario = new Usuario(); // usuario mapeado al formulario
  confirmPassword: string = '';
  msgregister!: string; // mensaje de error del registro
  successMsg!: string; // mensaje de éxito del registro

  constructor(
    private router: Router,
    private loginApi: LoginApi,
    private cdr: ChangeDetectorRef) {
  }

  register() {
    // validación básica de coincidencia de contraseñas
    if (this.userform.password !== this.confirmPassword) {
      this.msgregister = 'Las contraseñas no coinciden.';
      return;
    }
    this.userform.perfil="cliente";

    this.loginApi.register(this.userform)
      .subscribe(
        (result) => {
          var user = result;
          if (user.status == 1) {
            this.successMsg = 'Cuenta creada correctamente. Ya puedes iniciar sesión.';
            this.msgregister = '';
            this.cdr.detectChanges();
            // redirigimos al login luego de un breve delay
            setTimeout(() => this.router.navigateByUrl('/login'), 1500);
          } else {
            // el usuario ya existe u otro error de negocio
            this.msgregister = user.msg || 'No se pudo completar el registro.';
            this.cdr.detectChanges();
          }
        },
        error => {
          alert('Error de conexion');
          console.log('error en conexion');
        });
  }
}