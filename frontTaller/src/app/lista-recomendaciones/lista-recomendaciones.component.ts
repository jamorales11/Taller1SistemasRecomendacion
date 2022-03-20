import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-lista-recomendaciones',
  templateUrl: './lista-recomendaciones.component.html',
  styleUrls: ['./lista-recomendaciones.component.css']
})
export class ListaRecomendacionesComponent implements OnInit {

  recomendaciones : any[] = [];

  constructor(private usuarioService: UsuarioService) { 
    this.usuarioService.get_recomendaciones_by_id(usuarioService.idLogged).subscribe((data:any) =>{
      console.log(data)
      this.recomendaciones = data;
    })
  }

  ngOnInit(): void {
  }

}
