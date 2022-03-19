import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-lista-artistas',
  templateUrl: './lista-artistas.component.html',
  styleUrls: ['./lista-artistas.component.css']
})
export class ListaArtistasComponent implements OnInit {

  artistasEscuchados : any[] = [];

  constructor(private usuarioService: UsuarioService) {
      this.usuarioService.get_artistas_by_id(usuarioService.idLogged).subscribe((data:any) =>{
        console.log(data)
        this.artistasEscuchados = data;
      })
   }

  ngOnInit(): void {
  }

}
