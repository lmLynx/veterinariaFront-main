import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioUsuarioComponent } from './usuario/inicio-usuario/inicio-usuario.component';
import { PrincipalComponent } from './principal/principal.component';
import { PerfilUsuarioComponent } from './usuario/perfil-usuario/perfil-usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { ValidarMailComponent } from './usuario/validar-mail/validar-mail.component';
import { PanelControlAdminComponent } from './administrador/panel-control-admin/panel-control-admin.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: PrincipalComponent }, // Ruta de la pantalla de inicio
    { path: 'app-inicio-usuario', component: InicioUsuarioComponent }, // Ruta hacia otro componente

    {
      path: 'perfil-usuario', component: PerfilUsuarioComponent
    },
    {
      path: 'crear-usuario', component: CrearUsuarioComponent
    },
    {
      path: 'validar-mail/:token/:idUser', component: ValidarMailComponent
    },
    {
      path: 'panel-admin', component: PanelControlAdminComponent
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }