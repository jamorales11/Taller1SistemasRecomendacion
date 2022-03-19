import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from './usuario';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.get_usuario(usuarioService.idLogged).subscribe((data:any) => {
      console.log(data[0]);

      this.usuario.id = data[0]["#id"];

      if(data[0]["age"] != null){
        this.usuario.age = data[0]["age"];
      } else {
        this.usuario.age = "N/A"
      }

      if(data[0]["gender"] == "m"){
        this.usuario.gender = "Male";
      } else if(data[0]["gender"] == "f"){
        this.usuario.gender = "Female";
      } else if(data[0]["gender"] != null){
        this.usuario.gender = data[0]["gender"];
      } else {
        this.usuario.gender = "N/A"
      }

      if(data[0]["country"] != null){
        this.usuario.country = data[0]["country"];
      } else {
        this.usuario.country = "N/A"
      }

      if(data[0]["registered"] != null){
        this.usuario.registered = data[0]["registered"];
      } else {
        this.usuario.registered = "N/A"
      }
      console.log(this.usuario);
    });
  }


  ngOnInit(): void {

  }

  

}
