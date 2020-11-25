import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteListaComponent } from "./components/cliente-lista/cliente-lista.component";
import { ClienteNovoComponent } from "./components/cliente-novo/cliente-novo.component";
import { HomeComponent } from "./components/home/home.component";
import { NovoUsuarioComponent } from "./components/novo-usuario/novo-usuario.component";
import { AuthGuard } from "./components/security/auth.guard";
import { LoginComponent } from "./components/security/login/login.component";
import { UsuarioListaComponent } from "./components/usuario-lista/usuario-lista.component";

export const ROUTES: Routes = [
  { path : '', component: HomeComponent, canActivate: [AuthGuard]},
  { path : 'login', component: LoginComponent },

  { path : 'novo-usuario', component: NovoUsuarioComponent, canActivate: [AuthGuard]},
  { path : 'novo-usuario/:id' , component: NovoUsuarioComponent, canActivate: [AuthGuard] },
  { path : 'usuario-lista', component: UsuarioListaComponent, canActivate: [AuthGuard]},

  { path : 'cliente-novo', component: ClienteNovoComponent, canActivate: [AuthGuard]},
  { path : 'cliente-novo/:id', component: ClienteNovoComponent, canActivate: [AuthGuard]},
  { path : 'cliente-lista', component: ClienteListaComponent, canActivate: [AuthGuard]}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
