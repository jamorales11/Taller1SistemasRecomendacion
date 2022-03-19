import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../usuario/usuario';

const API_URL = "http://127.0.0.1:5000/"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  loggedIn : boolean = false;

  idLogged: string = "";


  constructor( private http: HttpClient) { 
    console.log("Usuario API lista")
  }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };


  createUsuario(usuario: Usuario){

    return this.http.post(API_URL + 'create_usuario', usuario, this.httpOptions);
  }

  get_usuario(id:string){
    return this.http.get(API_URL + 'find_usuario/' + id);
  }

  get_artistas_by_id(id:string){
    return this.http.get(API_URL + 'find_artists_by_user/' + id);
  }

  getLogStatus (){
    return this.loggedIn;
  }

  setLogStatus (status: boolean){
    
    this.loggedIn = status;
  }
}
