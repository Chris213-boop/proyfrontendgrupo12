import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { LoginApi } from '../../services/login-api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  returnUrl!: string;
  msglogin!: string; // mensaje que indica si no paso el loguin
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginApi: LoginApi,
    private cdr:ChangeDetectorRef) {
  }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
    this.loginApi.login(this.userform.username, this.userform.password)
      .subscribe(
        (result) => {
          var user = result;
          if (user.status == 1) {
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("perfil", user.perfil);
            sessionStorage.setItem("token", user.token);
            //redirigimos a home o a pagina que llamo
            this.router.navigateByUrl(this.returnUrl);
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas.";
            this.cdr.detectChanges();
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          //console.log(error);
        });
  }
}
