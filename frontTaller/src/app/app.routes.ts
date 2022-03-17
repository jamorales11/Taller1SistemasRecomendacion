import { RouterModule, Routes } from '@angular/router';
import { ListaArtistasComponent } from './lista-artistas/lista-artistas.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsuarioComponent } from './usuario/usuario.component';

const ROUTES: Routes = [
    { path: "usuario", component: UsuarioComponent},
    { path: "login", component: LoginComponent},
    { path: "register", component: RegisterComponent},
    { path: "artistas", component: ListaArtistasComponent},
    { path: "**", pathMatch: "full", redirectTo: "login"},
    
  ];

  export const APP_ROUTING = RouterModule.forRoot(ROUTES);