export interface Acceso {
    id: number;
    fecha_hora: string;
    ip_origen: string;
    accion_realizada: string;
    usuarioId?: number | null;
}