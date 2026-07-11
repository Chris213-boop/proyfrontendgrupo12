import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfiguracionService } from '../../../services/configuracion';
import { Configuracion } from '../../../models/configuracion';
import { FormsModule } from '@angular/forms';
import { LoginApi } from '../../../services/login-api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seguridad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seguridad.html',
  styleUrl: './seguridad.css',
})
export class Seguridad {

  cargando = false;
  configuracion: Configuracion = new Configuracion();
  constructor(
    private configuracionService: ConfiguracionService,
    public loginApi: LoginApi,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarConfiguracion();
  }
  cargarConfiguracion() {
    this.configuracionService.getConfiguracion().subscribe({
      next: (data) => {
        this.configuracion = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        alert('Debes ingresar con una cuenta Administrador');
        this.router.navigateByUrl('/login');
      }
    });
  }

  guardarConfiguracion() {
    this.configuracionService.actualizarConfiguracion(this.configuracion).subscribe({
      next: () => {
        this.cargando = false;
        alert("Configuración guardada correctamente");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
