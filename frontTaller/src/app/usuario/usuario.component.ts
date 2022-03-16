import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) {this.usuario_id = "";}

  usuario_id : string;

  ngOnInit(): void {
    if(this.usuario_id){
      this.getUsuario(this.usuario_id);
      console.log(this.getUsuario(this.usuario_id));
    }
  }

  getUsuario(usuario_id: string):void{
    this.usuarioService.getUsuario(usuario_id);
  }

}
