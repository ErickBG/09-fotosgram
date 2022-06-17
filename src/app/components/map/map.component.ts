import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() coords:string = null;
  @ViewChild('mapa') mapa;

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit(){

    const coordenadas = this.coords?this.coords:'19.393054246137012, -99.15716214705417'

    const latLng = coordenadas.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    console.log(this.coords);
    console.log(coordenadas);
    console.log(latLng);
    console.log(lat);
    console.log(lng);

    mapboxgl.accessToken = 'pk.eyJ1IjoiZWJhbGRlcmFzNyIsImEiOiJjbDNhcHVoMG8wMDJnM2RwYXZ5OXZrenJ3In0.kchxfkkww3mBEN-30my8cg';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng,lat],
      zoom: 15
    });

    const marker = new mapboxgl.Marker().setLngLat([lng,lat]).addTo(map);
  }
}
