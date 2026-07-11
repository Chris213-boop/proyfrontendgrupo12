import { Pedido } from "./pedido";

export class Pago {
    mp_payment_id: string;
    estado_pago: string;
    fecha_pago: Date;
    pedidoId?:number;
    Pedido?: Pedido;
    
    constructor(mp_payment_id: string, estado_pago: string, fecha_pago: Date, pedidoId?: number, Pedido?: Pedido) {
        this.mp_payment_id = mp_payment_id;
        this.estado_pago = estado_pago;
        this.fecha_pago = fecha_pago;
        this.pedidoId = pedidoId;
        this.Pedido = Pedido;
    }
}