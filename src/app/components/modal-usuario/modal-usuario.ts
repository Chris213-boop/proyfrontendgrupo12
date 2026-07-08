import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-modal-usuario',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-usuario.html',
  styleUrl: './modal-usuario.css',
})
export class ModalUsuario implements OnChanges {
  @Input() usuarioEditar: Usuario | null = null;
  @Output() usuarioGuardado = new EventEmitter<void>();

  usuario: Usuario = new Usuario();
  mensaje = '';
  tipoMensaje = '';
  guardando = false;
  modoEdicion = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuarioEditar']) {
      if (this.usuarioEditar) {
        this.usuario = { ...this.usuarioEditar };
        this.modoEdicion = true;
      } else {
        this.usuario = new Usuario();
        this.modoEdicion = false;
      }
      this.mensaje = '';
      this.tipoMensaje = '';
    }
  }

  guardarUsuario(): void {
    if (!this.usuario.username || !this.usuario.nombres || !this.usuario.apellido || !this.usuario.perfil) {
      this.mensaje = 'Completá todos los campos antes de guardar.';
      this.tipoMensaje = 'danger';
      return;
    }

    if (!this.modoEdicion && !this.usuario.password) {
      this.mensaje = 'La contraseña es obligatoria para crear un usuario.';
      this.tipoMensaje = 'danger';
      return;
    }

    this.guardando = true;
    this.mensaje = '';

    const solicitud = this.modoEdicion && this.usuario.id
      ? this.usuarioService.actualizarUsuario(this.usuario.id, this.usuario)
      : this.usuarioService.agregarUsuario(this.usuario);

    solicitud.subscribe({
      next: () => {
        this.mensaje = this.modoEdicion ? 'Usuario actualizado correctamente.' : 'Usuario registrado correctamente.';
        this.tipoMensaje = 'success';
        this.usuario = new Usuario();
        this.modoEdicion = false;
        this.guardando = false;
        this.usuarioGuardado.emit();
      },
      error: () => {
        this.mensaje = this.modoEdicion ? 'No se pudo actualizar el usuario.' : 'No se pudo registrar el usuario.';
        this.tipoMensaje = 'danger';
        this.guardando = false;
      }
    });
  }
}
