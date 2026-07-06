import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:3000/api/productos';

  private productosMock: Producto[] = [
    {
      id: 1,
      nombre: 'Anillo Solitario Plata 925',
      categoria: 'anillos',
      precio: 45000,
      descuento: 15,
      imagen: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',
      descripcion: 'Anillo solitario en plata 925 con circonia central, acabado pulido a espejo.',
      material: 'Plata 925',
      destacado: true,
      stock: true
    },
    {
      id: 2,
      nombre: 'Anillo Trinity Oro Laminado',
      categoria: 'anillos',
      precio: 38000,
      imagen: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600',
      descripcion: 'Anillo de tres aros entrelazados, oro laminado 18k, ideal uso diario.',
      material: 'Oro laminado 18k',
      stock: true
    },
    {
      id: 3,
      nombre: 'Anillo Ajustable Perla',
      categoria: 'anillos',
      precio: 29500,
      descuento: 10,
      imagen: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
      descripcion: 'Anillo ajustable con perla cultivada, base en plata.',
      material: 'Plata y perla cultivada',
      stock: true
    },
    {
      id: 4,
      nombre: 'Collar Gargantilla Minimalista',
      categoria: 'collares',
      precio: 32000,
      descuento: 20,
      imagen: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600',
      descripcion: 'Gargantilla fina de acero quirúrgico dorado, no se oxida ni se mancha.',
      material: 'Acero quirúrgico dorado',
      destacado: true,
      stock: true
    },
    {
      id: 5,
      nombre: 'Collar Cadena Cubana',
      categoria: 'collares',
      precio: 56000,
      imagen: 'https://images.unsplash.com/photo-1599643478212-cf228d44d3aa?w=600',
      descripcion: 'Cadena cubana clásica, eslabones macizos en oro laminado.',
      material: 'Oro laminado 18k',
      stock: true
    },
    {
      id: 6,
      nombre: 'Collar Colgante Corazón',
      categoria: 'collares',
      precio: 27500,
      descuento: 12,
      imagen: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600',
      descripcion: 'Colgante corazón en plata con baño de rodio, cadena incluida.',
      material: 'Plata 925 con baño de rodio',
      destacado: true,
      stock: false
    },
    {
      id: 7,
      nombre: 'Aretes Argolla Clásica',
      categoria: 'aretes',
      precio: 21000,
      imagen: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600',
      descripcion: 'Argollas medianas en acero dorado, livianas y antialérgicas.',
      material: 'Acero quirúrgico dorado',
      stock: true
    },
    {
      id: 8,
      nombre: 'Aretes Perla Boton',
      categoria: 'aretes',
      precio: 18500,
      descuento: 10,
      imagen: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600',
      descripcion: 'Aretes tipo botón con perla cultivada, base de plata.',
      material: 'Plata y perla cultivada',
      stock: true
    },
    {
      id: 9,
      nombre: 'Aretes Colgantes Geométricos',
      categoria: 'aretes',
      precio: 24000,
      imagen: 'https://images.unsplash.com/photo-1599643477719-c0a6e8e6f6f9?w=600',
      descripcion: 'Diseño geométrico colgante, acabado dorado mate.',
      material: 'Acero dorado mate',
      destacado: true,
      stock: true
    },
    {
      id: 10,
      nombre: 'Pulsera Tenis Circonias',
      categoria: 'pulseras',
      precio: 41000,
      descuento: 18,
      imagen: 'https://images.unsplash.com/photo-1602752275197-909bcdc01dfc?w=600',
      descripcion: 'Pulsera tipo tenis con circonias engastadas en toda su extensión.',
      material: 'Plata 925',
      destacado: true,
      stock: true
    },
    {
      id: 11,
      nombre: 'Pulsera Cadena Forzada',
      categoria: 'pulseras',
      precio: 26500,
      imagen: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600',
      descripcion: 'Cadena forzada clásica, cierre de mosquetón reforzado.',
      material: 'Oro laminado 18k',
      stock: true
    },
    {
      id: 12,
      nombre: 'Pulsera Charms Personalizable',
      categoria: 'pulseras',
      precio: 33000,
      descuento: 8,
      imagen: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600',
      descripcion: 'Base para charms intercambiables, incluye dos charms de regalo.',
      material: 'Plata 925',
      stock: true
    }
  ];

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/categoria/${categoria}`);
  }

  getProductoPorId(id: number): Observable<Producto | undefined> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  getDestacados(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/destacados`);
  }

  editProducto(producto: Producto): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(producto);
    return this.http.put<Producto[]>(`${this.apiUrl}/${producto.id}`, body, httpOption);
  }
}
