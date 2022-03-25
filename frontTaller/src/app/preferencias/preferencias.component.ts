import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent implements OnInit {

  artistas : any[] = [];
  populares : any[] = [];
  seleccionadas: any[] = [];
  seleccion: string = "";

  seleccionCompleta: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuarioService.get_artistas_populares().subscribe((data:any) => {
      this.populares = data;
    });

    this.usuarioService.get_artistas().subscribe((data:any)=>{
      this.artistas = data;
    });
   }


  ngOnInit(): void {
  }


  agregarDeBuscador(){
    if(!this.seleccionadas.includes(this.seleccion)){
      this.seleccionadas.push(this.seleccion);
      this.seleccion = "";

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

    if(this.seleccionadas.length == 10){
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
   let incidencias : any[] = []; 
   let i = 0;
   while(i<this.seleccionadas.length){

    let j = 10-i;

    while(j>0){
      let incidencia = {"user_id": this.usuarioService.idLogged,'artist_id': this.artistas.find(element => element["artist_name"] == this.seleccionadas[i]).artist_id, "artist_name": this.seleccionadas[i], 'track_id': "", 'track_name': ""};
      incidencias.push(incidencia);
      j--;
    }
    i++;
   }
   console.log(incidencias);
   this.usuarioService.addPreferencias(incidencias).subscribe(() => {
    this.router.navigate(["/usuario"]);

   });
 }

 moverArriba(index:number){
  let temp = this.seleccionadas[index];
  this.seleccionadas[index] = this.seleccionadas[index-1];
  this.seleccionadas[index-1] = temp;;
 }

 moverAbajo(index:number){
  let temp = this.seleccionadas[index];
  this.seleccionadas[index] = this.seleccionadas[index+1];
  this.seleccionadas[index+1] = temp;
}

eliminar(index:number){
  this.seleccionadas.splice(index,1);
  if(this.seleccionadas.length < 10){
    this.seleccionCompleta = false;
  } 
}

}
