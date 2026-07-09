import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-pago-resultado',
  imports: [CommonModule, RouterLink],
  templateUrl: './pago-resultado.html',
  styleUrl: './pago-resultado.css'
})
export class PagoResultado implements OnInit {

  resultado: string = 'pending';
  procesando = true;

  constructor(
    private route: ActivatedRoute,
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.resultado = this.route.snapshot.data['resultado'];
    const paymentId = this.route.snapshot.queryParamMap.get('payment_id') || '';
    const pedidoId = sessionStorage.getItem('ultimoPedidoId');

    console.log('Resultado:', this.resultado);
    console.log('Pedido ID:', pedidoId);
    console.log('Payment ID:', paymentId);

    if (this.resultado === 'success' && pedidoId) {
      this.pedidoService.registrarPago({
        pedidoId: Number(pedidoId),
        mp_payment_id: paymentId,
        estado_pago: 'APROBADO'
      }).subscribe({
        next: (resp) => {

          console.log('Pago registrado correctamente:', resp);

          this.carritoService.vaciar();
          sessionStorage.removeItem('ultimoPedidoId');
          this.procesando = false;
          this.cdr.detectChanges();
        },
        error: (err) => {

          console.error('Error al registrar el pago:', err);

          this.procesando = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.procesando = false;
    }
  }
}