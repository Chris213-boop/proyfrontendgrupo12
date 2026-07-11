import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Pago } from '../../models/pago';
import { PagoService } from '../../services/pago';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagos',
  imports: [CommonModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css',
})
export class Pagos implements OnInit{

  pagos: Pago[] = [];
  private cdr = inject(ChangeDetectorRef);
  constructor(private pagoService: PagoService, private router: Router,) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(): void {
    this.pagoService.getPagos().subscribe({
      next: (data) => {
        console.log(data);
        this.pagos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        alert('Debes ingresar con una cuenta Empleado');
        this.router.navigateByUrl('/login');
      }
    });
  }
}
