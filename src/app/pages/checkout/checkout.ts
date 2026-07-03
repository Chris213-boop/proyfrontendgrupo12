import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ItemCarrito } from '../../models/item-carrito';
import { CarritoService } from '../../services/carrito';
import { PagoService } from '../../services/pago';
import { PrecioDescuentoPipe } from '../../pipes/precio-descuento-pipe';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, PrecioDescuentoPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {

  formulario: FormGroup;
  items: ItemCarrito[] = [];
  procesando = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private pagoService: PagoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carritoService.items$.subscribe(items => {
      this.items = items;
      if (items.length === 0) {
        this.router.navigate(['/carrito']);
      }
      this.cdr.detectChanges();
    });
  }

  get nombre() { return this.formulario.get('nombre'); }
  get email() { return this.formulario.get('email'); }
  get telefono() { return this.formulario.get('telefono'); }
  get direccion() { return this.formulario.get('direccion'); }
  get ciudad() { return this.formulario.get('ciudad'); }
  get provincia() { return this.formulario.get('provincia'); }

  get subtotal(): number { return this.carritoService.subtotal; }
  get envio(): number { return this.subtotal >= 40000 ? 0 : 4500; }
  get total(): number { return this.subtotal + this.envio; }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.procesando = true;
    this.error = '';

    this.pagoService.crearPreferencia({
      items: this.items,
      comprador: this.formulario.value
    }).subscribe({
      next: (respuesta) => {
        this.carritoService.vaciar();
        window.location.href = respuesta.initPoint;
      },
      error: () => {
        this.procesando = false;
        this.error = 'No se pudo procesar el pago. Intentá de nuevo.';
        this.cdr.detectChanges();
      }
    });
  }
}
