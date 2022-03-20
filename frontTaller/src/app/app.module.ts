import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioService } from './services/usuario.service';
import { APP_ROUTING } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListaArtistasComponent } from './lista-artistas/lista-artistas.component';
import { ListaRecomendacionesComponent } from './lista-recomendaciones/lista-recomendaciones.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ListaArtistasComponent,
    ListaRecomendacionesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING, 
    FormsModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
