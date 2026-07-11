import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccesoService } from '../../services/acceso';
import { Acceso } from '../../models/acceso';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accesos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accesos.html',
  styleUrl: './accesos.css'
})
export class Accesos implements OnInit {

  listaAccesos: Acceso[] = [];

  constructor(
    private accesoService: AccesoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.accesoService.obtenerAccesos().subscribe({
      next: (data) => {
        this.listaAccesos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar la bitácora de accesos:', err);
        alert('Debes ingresar con una cuenta Empleado');
        this.router.navigateByUrl('/login');
      }
    });
  }

  borrarRegistro(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro de auditoría?')) {
      this.accesoService.eliminarAcceso(id).subscribe({
        next: () => {
          // Filtramos el array localmente para no tener que recargar toda la página de la BD
          this.listaAccesos = this.listaAccesos.filter(acc => acc.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}