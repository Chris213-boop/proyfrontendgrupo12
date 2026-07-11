import { Component, OnInit } from '@angular/core';
import { EstadisticasDashboard, ServicioDashboard } from '../../../services/dashboard';

@Component({
  selector: 'app-sistema',
  imports: [],
  templateUrl: './sistema.html',
  styleUrl: './sistema.css',
})
export class Sistema implements OnInit {
  datosSistema: EstadisticasDashboard = {
    usuarios: 0,
    productos: 0,
    pedidos: 0,
    ventasMes: 0,
    mensajes: 0,
    clientes: 0,
    estadoSistema: {
      api: false,
      baseDatos: false,
      mercadoPago: false,
      servidor: false
    },
    informacionSistema: {
      version: 'Cargando...',
      framework: 'Angular',
      nodeVersion: 'Cargando...',
      baseDatos: 'PostgreSQL',
      ultimaActualizacion: 'Cargando...',
      emailJs: false
    }
  };

  cargando = true;
  error = false;

  constructor(private servicioDashboard: ServicioDashboard) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.error = false;

    this.servicioDashboard.obtenerEstadisticas().subscribe({
      next: (datos) => {
        this.datosSistema = {
          ...datos,
          estadoSistema: datos.estadoSistema ?? {
            api: false,
            baseDatos: false,
            mercadoPago: false,
            servidor: false
          },
          informacionSistema: datos.informacionSistema ?? {
            version: '1.0.0',
            framework: 'Angular 21',
            nodeVersion: 'N/D',
            baseDatos: 'PostgreSQL',
            ultimaActualizacion: 'N/D',
            emailJs: false
          }
        };
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar datos del sistema:', err);
        this.error = true;
        this.cargando = false;
      }
    });
  }

  getBadgeClass(estado: boolean | undefined): string {
    return estado ? 'bg-success' : 'bg-danger';
  }

  getEstadoTexto(estado: boolean | undefined): string {
    return estado ? 'En línea' : 'Caído';
  }
}
