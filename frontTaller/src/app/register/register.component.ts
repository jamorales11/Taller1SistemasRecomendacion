import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  nuevoUsuario: Usuario = new Usuario;


  createUsuario(): Usuario{
    console.log("Formulario enviado");
    this.nuevoUsuario.registered = Date.now().toString();
    console.log(this.nuevoUsuario);
    this.usuarioService.createUsuario(this.nuevoUsuario).subscribe((usuario: any) => {
      this.nuevoUsuario = usuario;
    });

    return this.nuevoUsuario;
  }

  ngOnInit(): void {
    this.nuevoUsuario = new Usuario;
  }

}
