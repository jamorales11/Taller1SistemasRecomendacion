import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';

const ROUTES: Routes = [
    { path: "usuario", component: UsuarioComponent},
    { path: "**", pathMatch: "full", redirectTo: "/"},
    
  ];

  export const APP_ROUTING = RouterModule.forRoot(ROUTES);