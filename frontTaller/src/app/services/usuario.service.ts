import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../usuario/usuario';

const API_URL = "http://localhost:5000/"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  loggedIn : boolean = false;

  idLogged: string = "";

  conArtistas: boolean = false;


  constructor( private http: HttpClient) { 
    console.log("Usuario API lista")
  }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };


  createUsuario(usuario: Usuario){

    return this.http.post(API_URL + 'create_usuario', usuario, this.httpOptions);
  }

  addPreferencias(preferencias: any[]){
    return this.http.post(API_URL + 'add_preferencias', preferencias, this.httpOptions);
  }

  get_usuario(id:string){
    return this.http.get(API_URL + 'find_usuario/' + id);
  }

  get_artistas_by_id(id:string){
    return this.http.get(API_URL + 'find_artists_by_user/' + id);
  }

  get_artistas(){
    return this.http.get(API_URL + 'get_artists');
  }

  get_recomendaciones_by_id(id:string){
    return this.http.get(API_URL + 'get_recomendaciones/' + id);
  }

  get_artistas_populares(){
    return this.http.get(API_URL + 'get_popular_artists');
  }

  getLogStatus (){
    return this.loggedIn;
  }

  setLogStatus (status: boolean){
    
    this.loggedIn = status;
  }
}
