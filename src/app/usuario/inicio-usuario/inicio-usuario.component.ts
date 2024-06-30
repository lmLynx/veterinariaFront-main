import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreacionUsuarioIn } from 'src/app/dtos/usuario/creacion-usuario-in';
import { ConsultaMascotasUsuarioOutDTO } from 'src/app/dtos/mascota/consulta-mascotas-usuario-out.dto';
import { UsuarioDTO } from 'src/app/dtos/usuario/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ModalInfoComponent } from 'src/app/utiles/modal-info/modal-info.component';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['../../app.component.css', '../../css/principal.css']
})
export class InicioUsuarioComponent {
  public creacionUsuarioIn: CreacionUsuarioIn;

  public userForm: FormGroup;

  public submitted: boolean = false;

  public mensajeCorreo: string;

  public usuarioDTO: UsuarioDTO;

  public consultaMascotasUsuarioOutDTO: ConsultaMascotasUsuarioOutDTO;

  //variables pantalla
  // usuario: string;
  contrasena: string;

  constructor(
    private router: Router,
    private form: FormBuilder,
    public usuarioService: UsuarioService,
    private mascotaService: MascotaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalInfoComponent>,
    private serviciosVeterinariaService: ServiciosVeterinariaService,
  ) {
    this.userForm = this.form.group({
      password: ['', Validators.required],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  volver() {
    this.closeDialog();
  }

  iniciarSesion() {
    this.submitted = true;
    if (this.userForm.invalid) {
      if (this.f['correo'].hasError('required')) {
        this.mensajeCorreo = 'El correo es requerido.';
      }
      if (this.f['correo'].hasError('pattern')) {
        this.mensajeCorreo = 'El correo no cumple con el formato correcto.';
      }
      return;
    }
    if (
      this.userForm.get('correo')?.value !== null &&
      this.userForm.get('password')?.value !== null
    ) {
      this.serviciosVeterinariaService
        .consultarUsuarioExistente(
          this.userForm.get('correo')?.value,
          this.userForm.get('password')?.value
        )
        .subscribe((respuesta) => {
          this.usuarioDTO = respuesta;
          console.log('usuario encontrado', this.usuarioDTO);

          if (!this.usuarioDTO.exitoso) {
            this.serviciosVeterinariaService.openInfoModal(
              this.usuarioDTO.mensaje
            );
            this.submitted = false;
          } else {
            //validamos si esta activo el user
            if (this.usuarioDTO.activo) {
              if (this.usuarioDTO.tipoUsuarioEnum === 'DUENO_MASCOTA') {
                this.mascotaService
                  .consultarMascotasUsuario(this.usuarioDTO.idUser)
                  .subscribe((resultado) => {

                    if (resultado.exitoso) {
                      this.consultaMascotasUsuarioOutDTO = resultado;
                      this.limpiarCampos();
                      this.closeDialog();
                      this.submitted = false;
                      this.usuarioService.setUsuarioData(this.usuarioDTO);
                      this.mascotaService.setMascotasData(
                        this.consultaMascotasUsuarioOutDTO
                      );
                      this.router.navigate(['/perfil-usuario']);
                      
                    } else {
                      this.serviciosVeterinariaService.openInfoModal(
                        this.consultaMascotasUsuarioOutDTO.mensaje
                      );
                    }
                  });
              }
              if (this.usuarioDTO.tipoUsuarioEnum === 'ADMINISTRADOR') {
                //es administrador
                this.limpiarCampos();
                this.closeDialog();
                this.submitted = false;
                this.usuarioService.setUsuarioData(this.usuarioDTO);
                this.router.navigate(['/panel-admin']);
              }
            } else {
              this.serviciosVeterinariaService.openInfoModal(
                'El usuario aún no ha sido activado'
              );
            }
          }
        });
    }
  }

  limpiarCampos() {
    this.userForm.get('usuario')?.setValue('');
    this.userForm.get('password')?.setValue('');
  }

  public get f() {
    return this.userForm.controls;
  }
}
