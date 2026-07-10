import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-envios',
  imports: [CommonModule],
  templateUrl: './envios.html',
  styleUrl: './envios.css',
})
export class Envios implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.obtenerPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
