import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto';
import { PrecioDescuentoPipe } from '../../pipes/precio-descuento-pipe';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, PrecioDescuentoPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  destacados: Producto[] = [];
  cargando = true;

  constructor(private productoService: ProductoService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productoService.getDestacados().subscribe(productos => {
      this.destacados = productos;
      this.cargando = false;
      this.cdr.detectChanges();
    });
  }
}
