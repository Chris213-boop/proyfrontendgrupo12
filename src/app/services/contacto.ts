import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MensajeContacto } from '../models/mensaje-contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private apiUrl = 'https://tu-api-real.com/api/contacto';

  constructor(private http: HttpClient) { }

  enviarMensaje(mensaje: MensajeContacto): Observable<{ ok: boolean }> {
    // Cuando este lista la API real, reemplazar por:
    // return this.http.post<{ ok: boolean }>(this.apiUrl, mensaje);
    console.log('Mensaje de contacto enviado (mock):', mensaje);
    return of({ ok: true }).pipe(delay(500));
  }
}
