import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EstadoSistema {
  api: boolean;
  baseDatos: boolean;
  mercadoPago: boolean;
  servidor: boolean;
}

export interface InformacionSistema {
  version: string;
  framework: string;
  nodeVersion: string;
  baseDatos: string;
  ultimaActualizacion: string;
  emailJs: boolean;
}

export interface EstadisticasDashboard {
  usuarios: number;
  productos: number;
  pedidos: number;
  ventasMes: number;
  mensajes: number;
  clientes: number;
  estadoSistema: EstadoSistema;
  informacionSistema?: InformacionSistema;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioDashboard {
  private urlApi = 'http://localhost:3000/api/dashboard/stats';

  constructor(private http: HttpClient) {}

  obtenerEstadisticas(): Observable<EstadisticasDashboard> {
    return this.http.get<EstadisticasDashboard>(this.urlApi);
  }
}