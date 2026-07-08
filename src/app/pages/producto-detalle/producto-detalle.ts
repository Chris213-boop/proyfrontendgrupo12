import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto';
import { CarritoService } from '../../services/carrito';
import { PrecioDescuentoPipe } from '../../pipes/precio-descuento-pipe';

@Component({
  selector: 'app-producto-detalle',
  imports: [CommonModule, RouterLink, PrecioDescuentoPipe],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css'
})
export class ProductoDetalle implements OnInit {

  producto: Producto | undefined;
  cargando = true;
  noEncontrado = false;
  cantidad = 1;
  agregado = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.cargando = true;
      this.productoService.getProductoPorId(id).subscribe(producto => {
        this.producto = producto;
        this.noEncontrado = !producto;
        this.cargando = false;
        this.cdr.detectChanges();
      });
    });
  }

  aumentarCantidad(): void {
    this.cantidad++;
  }

  disminuirCantidad(): void {
    if (this.cantidad > 1) this.cantidad--;
  }

  agregarAlCarrito(): void {
    if (!this.producto) return;
    this.carritoService.agregar(this.producto, this.cantidad);
    this.agregado = true;
    setTimeout(() => {
      this.agregado = false;
      this.cdr.detectChanges();
    }, 2000);
    this.cdr.detectChanges();
  }

  irAlCarrito(): void {
    this.router.navigate(['/carrito']);
  }
}

