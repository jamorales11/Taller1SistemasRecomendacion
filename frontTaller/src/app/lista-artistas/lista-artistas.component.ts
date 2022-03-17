import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-lista-artistas',
  templateUrl: './lista-artistas.component.html',
  styleUrls: ['./lista-artistas.component.css']
})
export class ListaArtistasComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) {
      this.usuarioService.get_artistas_by_id("user_000001").subscribe((data:any) =>{
        console.log(data)
      })
   }

  ngOnInit(): void {
  }

}
