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
  private apiUrl = 'http://localhost:3000/api/mp/payment';

  constructor(private http: HttpClient) {}

  crearPreferencia(datos: PreferenciaPago): Observable<RespuestaPago> {
     return this.http.post<RespuestaPago>(this.apiUrl, datos);
  }
}
