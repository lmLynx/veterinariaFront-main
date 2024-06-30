import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditarUsuarioMascotaInDTO } from 'src/app/dtos/usuario/editar-usuario-mascota-in.dto';
import { UsuarioDTO } from 'src/app/dtos/usuario/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['../../app.component.css', '../../css/principal.css'],
})
export class PerfilUsuarioComponent {
  userName: string;

  public usuarioDTO: UsuarioDTO;

  //mostrar u ocultar informacion de pantalla
  public mostrarInformacionB: boolean = true;
  public mostrarEditaB: boolean = false;
  public mostrarMascotasB: boolean = false;
  public mostrarAgendabB: boolean = false;

  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
  ) {
    // Recupera el valor del parámetro 'id' de la URL
    // this.route.queryParams.subscribe((params) => {
    //   this.usuarioDTO = JSON.parse(params['user']);
    //   console.log('recibido', this.usuarioDTO);

    //   this.userName = this.usuarioDTO.nombre;
    // });
    this.usuarioDTO = usuarioService.getUsuarioData();
    console.log('recibido', this.usuarioDTO);
  }

  volver() {
    this.router.navigate(['/']);
  }

  //pantalla de la informacion del usuario
  mostrarInformacion() {
    this.mostrarInformacionB = true;
    this.mostrarEditaB = false;
    this.mostrarMascotasB = false;
    this.mostrarAgendabB = false;
  }

  //muestra la pantalla de editar perfil
  mostrarEditar() {
    this.mostrarInformacionB = false;
    this.mostrarEditaB = true;
    this.mostrarMascotasB = false;
    this.mostrarAgendabB = false;
  }

  mostrarMascotas() {
    this.mostrarInformacionB = false;
    this.mostrarEditaB = false;
    this.mostrarMascotasB = true;
    this.mostrarAgendabB = false;
  }

  mostrarAgenda() {
    this.mostrarInformacionB = false;
    this.mostrarEditaB = false;
    this.mostrarMascotasB = false;
    this.mostrarAgendabB = true;
  }

}
