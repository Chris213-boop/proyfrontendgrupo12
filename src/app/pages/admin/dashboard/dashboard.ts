import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioDashboard, EstadisticasDashboard } from '../../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  estadisticas: EstadisticasDashboard = {
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
    }
  };

  cargando = true;

  constructor(private servicioDashboard: ServicioDashboard,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.servicioDashboard.obtenerEstadisticas().subscribe({
      next: (datos) => {
        this.estadisticas = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
}
