import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioUsuarioComponent } from './usuario/inicio-usuario/inicio-usuario.component';
import { PrincipalComponent } from './principal/principal.component';
import { PerfilUsuarioComponent } from './usuario/perfil-usuario/perfil-usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { ValidarMailComponent } from './usuario/validar-mail/validar-mail.component';
import { PanelControlAdminComponent } from './administrador/panel-control-admin/panel-control-admin.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VeterinariosComponent } from './veterinarios/veterinarios.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { RecetasComponent } from './recetas/recetas.component';
import { ClientesformComponent } from './clientesform/clientesform.component';
import { VeterinariosformComponent } from './veterinariosform/veterinariosform.component';
import { MascotasformComponent } from './mascotasform/mascotasform.component';
import { ConsultasformComponent } from './consultasform/consultasform.component';
import { RecetasformComponent } from './recetasform/recetasform.component';

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
    {
      path: 'mascotas', component: MascotasComponent
    },
    {
      path: 'clientes', component: ClientesComponent
    },
    {
      path: 'veterinarios', component: VeterinariosComponent
    },
    {
      path: 'consultas', component: ConsultasComponent
    },
    {
      path: 'recetas', component: RecetasComponent
    },
    { path: 'clientesForm', component: ClientesformComponent },
    { path: 'clientesForm/:id', component: ClientesformComponent },
    { path: 'veterinariosForm', component: VeterinariosformComponent },
    { path: 'veterinariosForm/:id', component: VeterinariosformComponent },
    { path: 'mascotasForm', component: MascotasformComponent },
    { path: 'mascotasForm/:id', component: MascotasformComponent },
    { path: 'consultasForm', component: ConsultasformComponent },
    { path: 'consultasForm/:id', component: ConsultasformComponent },
    { path: 'recetasForm', component: RecetasformComponent },
    { path: 'recetasForm/:id', component: RecetasformComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }