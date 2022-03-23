import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  artistas = [{"artista":"1"},{"artista":"2"},{"artista":"3" }];

  agregarPreferencias(){

  }

}
