import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalogo } from './pages/catalogo/catalogo';
import { CatalogoCategoria } from './pages/catalogo-categoria/catalogo-categoria';
import { ProductoDetalle } from './pages/producto-detalle/producto-detalle';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contacto } from './pages/contacto/contacto';
import { Carrito } from './pages/carrito/carrito';
import { Checkout } from './pages/checkout/checkout';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, title: 'Joyería Lumière | Inicio' },
  { path: 'catalogo', component: Catalogo, title: 'Joyería Lumière | Catálogo' },
  { path: 'catalogo/:categoria', component: CatalogoCategoria, title: 'Joyería Lumière | Catálogo' },
  { path: 'producto/:id', component: ProductoDetalle, title: 'Joyería Lumière | Detalle' },
  { path: 'nosotros', component: Nosotros, title: 'Joyería Lumière | Nosotros' },
  { path: 'contacto', component: Contacto, title: 'Joyería Lumière | Contacto' },
  { path: 'carrito', component: Carrito, title: 'Joyería Lumière | Carrito' },
  { path: 'checkout', component: Checkout, title: 'Joyería Lumière | Checkout' },
  { path: '**', component: NotFound, title: 'Página no encontrada' }
];
