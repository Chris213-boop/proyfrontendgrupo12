import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ItemCarrito } from '../../models/item-carrito';
import { CarritoService } from '../../services/carrito';
import { PagoService, CompradorMp } from '../../services/pago';
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
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      codigoArea: ['', [Validators.required, Validators.pattern(/^[0-9]{2,5}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{6,15}$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{7,9}$/)]],
      calle: ['', [Validators.required, Validators.minLength(3)]],
      numero: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
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
  get apellido() { return this.formulario.get('apellido'); }
  get email() { return this.formulario.get('email'); }
  get codigoArea() { return this.formulario.get('codigoArea'); }
  get telefono() { return this.formulario.get('telefono'); }
  get dni() { return this.formulario.get('dni'); }
  get calle() { return this.formulario.get('calle'); }
  get numero() { return this.formulario.get('numero'); }
  get codigoPostal() { return this.formulario.get('codigoPostal'); }
  get ciudad() { return this.formulario.get('ciudad'); }
  get provincia() { return this.formulario.get('provincia'); }

  get subtotal(): number { return this.carritoService.subtotal; }
  get envio(): number { return this.subtotal >= 40000 ? 0 : 4500; }
  get total(): number { return this.subtotal + this.envio; }

  private construirComprador(): CompradorMp {
    const v = this.formulario.value;
    return {
      email: v.email,
      name: v.nombre,
      surname: v.apellido,
      phone: {
        area_code: v.codigoArea,
        number: v.telefono
      },
      identification: {
        type: 'DNI',
        number: v.dni
      },
      address: {
        street_name: v.calle,
        street_number: Number(v.numero),
        zip_code: v.codigoPostal
      }
    };
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.procesando = true;
    this.error = '';

    this.pagoService.crearPreferencia({
      items: this.items,
      comprador: this.construirComprador()
    }).subscribe({
      next: (respuesta) => {
        this.carritoService.vaciar();
        window.location.href = respuesta.init_point;
      },
      error: () => {
        this.procesando = false;
        this.error = 'No se pudo procesar el pago. Intentá de nuevo.';
        this.cdr.detectChanges();
      }
    });
  }
}
