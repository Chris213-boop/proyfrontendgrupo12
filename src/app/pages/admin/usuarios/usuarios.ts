import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { ModalUsuario } from '../../../components/modal-usuario/modal-usuario';
import { UsuarioService } from '../../../services/usuario';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, ModalUsuario],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {

  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;
  estadisticas = {
    administradores: 0,
    gerentes: 0,
    clientes: 0,
    total: 0
  };

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.actualizarEstadisticas();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  actualizarEstadisticas(): void {
    const perfilNormalizado = (perfil: string = '') => perfil.toLowerCase();

    this.estadisticas = {
      administradores: this.usuarios.filter((usuario) => perfilNormalizado(usuario.perfil) === 'administrador').length,
      gerentes: this.usuarios.filter((usuario) => perfilNormalizado(usuario.perfil) === 'gerente').length,
      clientes: this.usuarios.filter((usuario) => perfilNormalizado(usuario.perfil) === 'cliente').length,
      total: this.usuarios.length
    };
  }

  obtenerNombreRol(perfil: string = ''): string {
    const perfilNormalizado = perfil.toLowerCase();

    if (perfilNormalizado === 'administrador') {
      return 'Administrador';
    }

    if (perfilNormalizado === 'gerente') {
      return 'Gerente';
    }

    return 'Cliente';
  }

  abrirModalNuevo(): void {
    this.usuarioSeleccionado = null;
  }

  abrirModalEdicion(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario };
  }

  eliminarUsuario(usuario: Usuario): void {
    if (!usuario.id) {
      return;
    }

    if (confirm(`¿Deseás eliminar a ${usuario.nombres} ${usuario.apellido}?`)) {
      this.usuarioService.eliminarUsuario(usuario.id).subscribe({
        next: () => {
          this.cargarUsuarios();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  usuarioRegistrado(): void {
    this.cargarUsuarios();
  }

}
