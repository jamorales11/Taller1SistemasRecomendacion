import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = "http://127.0.0.1:5000/"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  

  constructor( private http: HttpClient) { 
    console.log("Usuario API lista")
  }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  get_usuario(id:string){
    return this.http.get(API_URL + 'find_usuario/' + id);
  }
}
