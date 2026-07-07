import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = 'http://localhost:3000/api/usuario/';

  obtenerUsuarios(): Observable<Usuario[]> {
    return new Observable((observador) => {
      fetch(this.urlBase)
        .then(async (respuesta) => {
          if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los usuarios');
          }

          const datos = await respuesta.json();
          observador.next(datos);
          observador.complete();
        })
        .catch((error) => observador.error(error));
    });
  }

  agregarUsuario(usuario: Usuario): Observable<any> {
    return new Observable((observador) => {
      fetch(this.urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      })
        .then(async (respuesta) => {
          const datos = await respuesta.json();
          if (!respuesta.ok) {
            throw new Error(datos.msg || 'No se pudo crear el usuario');
          }

          observador.next(datos);
          observador.complete();
        })
        .catch((error) => observador.error(error));
    });
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<any> {
    return new Observable((observador) => {
      fetch(`${this.urlBase}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      })
        .then(async (respuesta) => {
          const datos = await respuesta.json();
          if (!respuesta.ok) {
            throw new Error(datos.msg || 'No se pudo actualizar el usuario');
          }

          observador.next(datos);
          observador.complete();
        })
        .catch((error) => observador.error(error));
    });
  }

  eliminarUsuario(id: number): Observable<any> {
    return new Observable((observador) => {
      fetch(`${this.urlBase}${id}`, { method: 'DELETE' })
        .then(async (respuesta) => {
          const datos = await respuesta.json();
          if (!respuesta.ok) {
            throw new Error(datos.msg || 'No se pudo eliminar el usuario');
          }

          observador.next(datos);
          observador.complete();
        })
        .catch((error) => observador.error(error));
    });
  }

}