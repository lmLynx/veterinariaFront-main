import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivarCuentaDTO } from 'src/app/dtos/activacion-cuenta/activar-cuenta.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-validar-mail',
  templateUrl: './validar-mail.component.html',
  styleUrls: ['../../app.component.css', '../../css/principal.css'],
})
export class ValidarMailComponent {
  private idUser: number;
  private token: string;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {}

  ngOnInit() {
    // Obtén el valor del parámetro "token" de la URL
    this.route.params.subscribe((params) => {
      this.token = params['token'];
      this.idUser = params['idUser'];
    });
  }

  validarSi() {
    let activarCuentaDTO: ActivarCuentaDTO = new ActivarCuentaDTO();
    activarCuentaDTO.idUsuario = this.idUser;
    activarCuentaDTO.token = this.token;

    this.usuarioService.activarCuenta(activarCuentaDTO).subscribe((res) => {
      if (res.exitoso) {
        this.serviciosVeterinariaService.openInfoModal(
          'Cuenta Activada correctamente, ya puedes cerrar esta página'
        );
        return;
      } else {
        this.serviciosVeterinariaService.openInfoModal(res.mensaje);
      }
    });
  }

  validarNo() {}
}
