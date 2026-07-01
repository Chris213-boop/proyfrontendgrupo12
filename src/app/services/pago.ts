import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ItemCarrito } from '../models/item-carrito';

export interface PreferenciaPago {
  items: ItemCarrito[];
  comprador: {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    provincia: string;
  };
}

export interface RespuestaPago {
  preferenceId: string;
  initPoint: string;    // URL de MercadoPago para redirigir al usuario
  sandboxInitPoint: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  // Cuando el backend esté listo, este endpoint crea la preferencia en MP
  private apiUrl = 'https://tu-api-real.com/api/pagos/crear-preferencia';

  constructor(private http: HttpClient) {}

  crearPreferencia(datos: PreferenciaPago): Observable<RespuestaPago> {
    // Cuando esté el backend, reemplazar por:
    // return this.http.post<RespuestaPago>(this.apiUrl, datos);

    // Mock: simula la respuesta de MP y redirige a una URL de sandbox
    const mockRespuesta: RespuestaPago = {
      preferenceId: 'mock-preference-' + Date.now(),
      initPoint: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=mock',
      sandboxInitPoint: 'https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=mock'
    };
    return of(mockRespuesta).pipe(delay(1000));
  }
}
