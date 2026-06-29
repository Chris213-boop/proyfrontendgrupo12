import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto';
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

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private cdr:ChangeDetectorRef
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
}
