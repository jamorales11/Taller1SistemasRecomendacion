import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  nuevoUsuario: Usuario = new Usuario;


  createUsuario(): Usuario{
    console.log("Formulario enviado");
    this.nuevoUsuario.registered = Date.now().toString();
    console.log(this.nuevoUsuario);

    this.usuarioService.get_usuario(this.nuevoUsuario.id).subscribe( (data:any) => {
      if (data.length == 0){
        this.usuarioService.createUsuario(this.nuevoUsuario).subscribe((usuario: any) => {
          this.nuevoUsuario = usuario;
          this.router.navigate(['/login'])
        });
      }
    })

    

    return this.nuevoUsuario;
  }

  ngOnInit(): void {
    this.nuevoUsuario = new Usuario;
  }

}
