import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnvioCorreoInDTO } from 'src/app/dtos/activacion-cuenta/envio-correo-in.dto';
import { CreacionUsuarioIn } from 'src/app/dtos/usuario/creacion-usuario-in';
import { CreacionUsuarioOutDTO } from 'src/app/dtos/usuario/creacion-usuario-out.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-crear-usuario-control',
  templateUrl: './crear-usuario-control.component.html',
  styleUrls: ['../../../../app.component.css', '../../../../css/principal.css'],
})
export class CrearUsuarioControlComponent {
  public crearUsuarioForm: FormGroup;

  public submitted: boolean = false;

  public mensajeCorreo: string;

  public creacionUsuarioIn: CreacionUsuarioIn;

  loading: boolean = false; // Variable para controlar la visibilidad del símbolo de carga
  showOverlay: boolean = false;

  public creacionUsuarioOutDTO: CreacionUsuarioOutDTO;

  constructor(
    private form: FormBuilder,
    public usuarioService: UsuarioService,
    private serviciosVeterinariaService: ServiciosVeterinariaService,
    // modal
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearUsuarioControlComponent>
  ) {
    this.crearUsuarioForm = this.form.group({
      nombre: ['', Validators.required],
      celular: ['', Validators.required],
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

  volver() {
    this.dialogRef.close();
  }

  public get f() {
    return this.crearUsuarioForm.controls;
  }

  agregarUsuario() {
    this.submitted = true;
    this.crearUsuarioForm.updateValueAndValidity();
    if (this.crearUsuarioForm.invalid) {
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
        this.crearUsuarioForm.get('correo')?.value !== null &&
        this.crearUsuarioForm.get('password')?.value !== null &&
        this.crearUsuarioForm.get('Cpassword')?.value !== null
      ) {
        this.creacionUsuarioIn = new CreacionUsuarioIn();
        this.creacionUsuarioIn.nombre =
          this.crearUsuarioForm.get('nombre')?.value;
        this.creacionUsuarioIn.password =
          this.crearUsuarioForm.get('password')?.value;
        this.creacionUsuarioIn.cedula =
          this.crearUsuarioForm.get('cedula')?.value;
        this.creacionUsuarioIn.correo =
          this.crearUsuarioForm.get('correo')?.value;
        this.creacionUsuarioIn.celular =
          this.crearUsuarioForm.get('celular')?.value;
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
              envioIn.correo = this.crearUsuarioForm.get('correo')?.value;
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

  validarContrasenas(): boolean {
    console.log(
      this.crearUsuarioForm.get('password')?.value +
        ' ' +
        this.crearUsuarioForm.get('Cpassword')?.value
    );

    if (
      this.crearUsuarioForm.get('password')?.value !== null &&
      this.crearUsuarioForm.get('Cpassword')?.value !== null &&
      this.crearUsuarioForm.get('password')?.value ===
        this.crearUsuarioForm.get('Cpassword')?.value
    ) {
      return true;
    }
    return false;
  }

  limpiarCampos() {
    // this.userForm.get('usuario')?.setValue('');
    this.crearUsuarioForm.get('nombre')?.setValue('');
    this.crearUsuarioForm.get('correo')?.setValue('');
    this.crearUsuarioForm.get('cedula')?.setValue('');
    this.crearUsuarioForm.get('password')?.setValue('');
    this.crearUsuarioForm.get('Cpassword')?.setValue('');
    this.crearUsuarioForm.get('celular')?.setValue('');
    this.submitted = false;
  }
}
