import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const API_URL = "http://127.0.0.1:5000/";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  getUsuario(id:string):Observable<any>{
    return this.http.get(API_URL + "get_usuario/"+id);
  }
}
