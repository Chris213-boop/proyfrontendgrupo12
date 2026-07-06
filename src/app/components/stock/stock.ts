import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PrecioDescuentoPipe } from '../../pipes/precio-descuento-pipe';
import { Producto } from '../../models/producto';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-stock',
  imports: [CommonModule,RouterLink,PrecioDescuentoPipe,FormsModule],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock {
  productos: Producto[] = [];
  cargando = true;

  mostrarModal = false;
  guardando = false;
  productoSeleccionado: Producto | null = null;

  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.cargando = false;
      this.cdr.detectChanges();
    });
  }

  editar(producto: Producto){
    // Trabajamos sobre una copia para no mutar la lista hasta confirmar el guardado
    this.productoSeleccionado = { ...producto };
    this.mostrarModal = true;
  }

  cerrarModal(){
    this.mostrarModal = false;
    this.productoSeleccionado = null;
  }

  guardarEdicion(){
    if (!this.productoSeleccionado) return;

    this.guardando = true;
    // TODO: ajustar el nombre del método según lo que exponga tu ProductoService
    this.productoService.editProducto(this.productoSeleccionado).subscribe({
      next: (actualizado) => {
        this.guardando = false;
        this.cerrarModal();
      },
      error: (err) => {
        console.error(err);
        this.guardando = false;
      }
    });
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.cdr.detectChanges();
    });
  }

  borrar(producto: Producto){
    console.log(producto);
  }
}