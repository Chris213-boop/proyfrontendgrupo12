import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { PedidoService } from "../../services/pedido";
import { Pedido } from "../../models/pedido";
import { Router } from "@angular/router";


@Component({
  selector: 'app-pedidos',
  imports: [CommonModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.obtenerPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        alert('Debes ingresar con una cuenta Empleado');
        this.router.navigateByUrl('/login');
      }
    });
  }

}
