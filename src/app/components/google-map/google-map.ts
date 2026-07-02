import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-google-map',
  imports: [CommonModule],
  templateUrl: './google-map.html',
  styleUrl: './google-map.css'
})
export class GoogleMap implements OnInit, AfterViewInit {

  @Input() lat: number = -24.1858;       // San Salvador de Jujuy por defecto
  @Input() lng: number = -65.2995;
  @Input() zoom: number = 16;
  @Input() titulo: string = 'Joyería Lumière';
  @Input() altura: string = '350px';

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  private map: any;
  cargando = true;
  error = false;

  ngOnInit(): void {
    this.cargarScript();
  }

  ngAfterViewInit(): void {}

  private cargarScript(): void {
    if (typeof google !== 'undefined' && google.maps) {
      this.inicializarMapa();
      return;
    }

    const scriptExistente = document.getElementById('google-maps-script');
    if (scriptExistente) {
      scriptExistente.addEventListener('load', () => this.inicializarMapa());
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&language=es`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.inicializarMapa();
    script.onerror = () => {
      this.error = true;
      this.cargando = false;
    };
    document.head.appendChild(script);
  }

  private inicializarMapa(): void {
    try {
      const center = { lat: this.lat, lng: this.lng };

      this.map = new google.maps.Map(this.mapContainer.nativeElement, {
        center,
        zoom: this.zoom,
        styles: [
          { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
        ]
      });

      new google.maps.Marker({
        position: center,
        map: this.map,
        title: this.titulo,
        animation: google.maps.Animation.DROP
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding:4px"><strong>${this.titulo}</strong><br><small>Jujuy, Argentina</small></div>`
      });

      this.map.addListener('click', () => infoWindow.close());

      new google.maps.event.addListenerOnce(this.map, 'idle', () => {
        infoWindow.open(this.map, null);
        infoWindow.setPosition(center);
      });

      this.cargando = false;
    } catch {
      this.error = true;
      this.cargando = false;
    }
  }
}
