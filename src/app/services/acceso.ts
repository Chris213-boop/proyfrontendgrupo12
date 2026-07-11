import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acceso } from '../models/acceso';

@Injectable({
    providedIn: 'root'
})
export class AccesoService {

    private apiUrl = 'http://localhost:3000/api/accesos';

    constructor(private http: HttpClient) { }

    // Obtener todos los registros de auditoría
    obtenerAccesos(): Observable<Acceso[]> {
        return this.http.get<Acceso[]>(this.apiUrl);
    }

    eliminarAcceso(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}