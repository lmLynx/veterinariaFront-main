import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreacionUsuarioIn } from 'src/app/dtos/usuario/creacion-usuario-in';
import { CreacionUsuarioOutDTO } from 'src/app/dtos/usuario/creacion-usuario-out.dto';
import { EnvioCorreoInDTO } from 'src/app/dtos/activacion-cuenta/envio-correo-in.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: [
    '../../app.component.css',
    '../../css/principal.css',
    '../../lib/flaticon/font/flaticon.css'
  ],
})
export class CrearUsuarioComponent {
  public creacionUsuarioIn: CreacionUsuarioIn;

  public userForm: FormGroup;

  public submitted: boolean = false;

  public mensajeCorreo: string;

  public creacionUsuarioOutDTO: CreacionUsuarioOutDTO;

  loading: boolean = false; // Variable para controlar la visibilidad del símbolo de carga
  showOverlay: boolean = false; // Variable para controlar la visibilidad de la capa de fondo

  constructor(
    private router: Router,
    private form: FormBuilder,
    private usuarioService: UsuarioService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.userForm = this.form.group({
      nombre: [],
      celular: [],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      cedula: [],
      password: ['', Validators.required],
      Cpassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log(this.userForm);
  }

  volver() {
    this.router.navigate(['/']);
  }

  crearNuevoUsuario() {
    this.submitted = true;
    this.userForm.updateValueAndValidity();
    if (this.userForm.invalid) {
      if (this.f['correo'].hasError('required')) {
        this.mensajeCorreo = 'El correo es requerido.';
      }
      if (this.f['correo'].hasError('pattern')) {
        this.mensajeCorreo = 'El correo no cumple con el formato correcto.';
      }

      return;
    }
    if (this.validarContrasenas()) {
      if (
        this.userForm.get('correo')?.value !== null &&
        this.userForm.get('password')?.value !== null &&
        this.userForm.get('Cpassword')?.value !== null
      ) {
        this.creacionUsuarioIn = new CreacionUsuarioIn();
        this.creacionUsuarioIn.nombre = this.userForm.get('nombre')?.value;
        this.creacionUsuarioIn.password = this.userForm.get('password')?.value;
        this.creacionUsuarioIn.cedula = this.userForm.get('cedula')?.value;
        this.creacionUsuarioIn.correo = this.userForm.get('correo')?.value;
        this.creacionUsuarioIn.celular = this.userForm.get('celular')?.value;
        this.creacionUsuarioIn.tipoUsuarioEnum = 'DUENO_MASCOTA';
        this.loading = true; // Mostrar el símbolo de carga

        this.serviciosVeterinariaService
          .crearNuevoUsuario(this.creacionUsuarioIn)
          .subscribe((respuesta) => {
            console.log(respuesta);
            this.creacionUsuarioOutDTO = respuesta;
            if (!this.creacionUsuarioOutDTO.exitoso) {
              this.serviciosVeterinariaService.openInfoModal(
                this.creacionUsuarioOutDTO.mensaje
              );
              this.loading = false; // Ocultar el símbolo de carga
              this.showOverlay = false; // Ocultar la capa de fondo semitransparente
            } else {

              let envioIn: EnvioCorreoInDTO = new EnvioCorreoInDTO();
              envioIn.correo = this.userForm.get('correo')?.value;
              envioIn.idUser = this.creacionUsuarioOutDTO.idUser;
              this.usuarioService
                .mandarCorreoValidacion(envioIn)
                .subscribe((res) => {
                  if (res.exitoso) {
                    this.serviciosVeterinariaService.openInfoModal(
                      'Usuario registrado exitosamente, revisa tu correo para activar la cuenta'
                    );
                    this.limpiarCampos();
                    this.loading = false; // Ocultar el símbolo de carga
                    this.showOverlay = false; // Ocultar la capa de fondo semitransparente
                  } else {
                    this.serviciosVeterinariaService.openInfoModal(res.mensaje);
                    this.loading = false; // Ocultar el símbolo de carga
                    this.showOverlay = false; // Ocultar la capa de fondo semitransparente
                  }
                });
            }
          });
      } else {
        this.serviciosVeterinariaService.openInfoModal(
          'Se necesita por lo menos el usuario y contraseña'
        );
      }
    } else {
      this.serviciosVeterinariaService.openInfoModal(
        'Las contraseñas no coinciden'
      );
    }
  }

  limpiarCampos() {
    // this.userForm.get('usuario')?.setValue('');
    this.userForm.get('nombre')?.setValue('');
    this.userForm.get('correo')?.setValue('');
    this.userForm.get('cedula')?.setValue('');
    this.userForm.get('password')?.setValue('');
    this.userForm.get('Cpassword')?.setValue('');
    this.userForm.get('celular')?.setValue('');
    this.submitted = false;
  }

  validarContrasenas(): boolean {
    console.log(
      this.userForm.get('password')?.value +
        ' ' +
        this.userForm.get('Cpassword')?.value
    );

    if (
      this.userForm.get('password')?.value !== null &&
      this.userForm.get('Cpassword')?.value !== null &&
      this.userForm.get('password')?.value ===
        this.userForm.get('Cpassword')?.value
    ) {
      return true;
    }
    return false;
  }

  public get f() {
    return this.userForm.controls;
  }
}
