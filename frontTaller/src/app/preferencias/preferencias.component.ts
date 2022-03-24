import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent implements OnInit {

  populares : any[] = [];
  seleccionadas: any[] = [];
  seleccion: string = "";

  seleccionCompleta: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuarioService.get_artistas_populares().subscribe((data:any) => {
      this.populares = data;
    })
   }


  ngOnInit(): void {
  }


  agregarDeBuscador(){
    if(!this.seleccionadas.includes(this.seleccion)){
      this.seleccionadas.push(this.seleccion);

    }
    if(this.seleccionadas.length == 10){
      this.seleccionCompleta = true;
    }
  }


  agregarDeCheckbox(value:string, checked: boolean){
    if (checked && !this.seleccionadas.includes(value)){
      this.seleccionadas.push(value);
    } else if (!checked) {
      this.seleccionadas.splice(this.seleccionadas.indexOf(value),1);
    }

    if(this.seleccionadas.length == 5){
      this.seleccionCompleta = true;
    }   
 }


 isOnList(value:string){
  if(this.seleccionadas.includes(value)){
    return true;
  }
  return false;
 }

 onGuardar(){
   console.log(this.seleccionadas);
   this.router.navigate(["/usuario"]);
 }

}
