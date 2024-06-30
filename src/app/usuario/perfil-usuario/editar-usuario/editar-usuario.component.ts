import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditarUsuarioMascotaInDTO } from 'src/app/dtos/usuario/editar-usuario-mascota-in.dto';
import { UsuarioDTO } from 'src/app/dtos/usuario/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['../../../app.component.css', '../../../css/principal.css'],
})
export class EditarUsuarioComponent {
  public usuarioDTO: UsuarioDTO;
  //forms
  public editForm: FormGroup;

  public submittedEdit: boolean = false;

  public mensajeCorreo: string;

  public imagen: string;

  public CorreoEditar: string;
  public NombreEditar: string;
  public celularEditar: string;

  constructor(
    private form: FormBuilder,
    public usuarioService: UsuarioService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.editForm = this.form.group({
      nombre: [null],
      celular: [null],
      correo: [
        null,
        [
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
    });
    this.usuarioDTO = usuarioService.getUsuarioData();
    this.imagen = this.usuarioDTO.imagenUser;
    this.CorreoEditar = this.usuarioDTO.correo;
    this.NombreEditar = this.usuarioDTO.nombre;
    this.celularEditar = this.usuarioDTO.celular;
  }

  public get f() {
    return this.editForm.controls;
  }

  editarUsuario() {
    console.log('entro');

    if (
      this.editForm.get('correo')?.value === null &&
      this.editForm.get('nombre')?.value === null &&
      this.editForm.get('celular')?.value === null 
    ) {
      this.serviciosVeterinariaService.openInfoModal(
        'Para editar la información debe ingresar los nuevos datos'
      );
      return;
    }

    this.submittedEdit = true;
    //se valida que haya editado alguno de los dos campos
    if (this.editForm.invalid) {
      if (this.f['correo'].hasError('pattern')) {
        this.mensajeCorreo = 'El correo no cumple con el formato correcto.';
      }
      return;
    }

    let editarIn: EditarUsuarioMascotaInDTO = new EditarUsuarioMascotaInDTO();
    editarIn.correo = this.editForm.get('correo')?.value;
    editarIn.nombre = this.editForm.get('nombre')?.value;
    editarIn.idUsuario = this.usuarioDTO.idUser;
    editarIn.imagen = this.imagen;
    editarIn.celular =  this.editForm.get('celular')?.value;

    //se edita el user
    this.usuarioService.editarUsuario(editarIn).subscribe((resultado) => {
      if (resultado.exitoso) {
        this.serviciosVeterinariaService.openInfoModal(
          'Información editada exitosamente'
        );

        //se recupera el usuario editado
        this.serviciosVeterinariaService
          .consultarUsuarioExistente(
            this.editForm.get('correo')?.value,
            this.usuarioDTO.contrasena
          )
          .subscribe((resultado) => {
            this.usuarioDTO = resultado;
            this.usuarioService.setUsuarioData(this.usuarioDTO);
          });
      } else {
        this.serviciosVeterinariaService.openInfoModal(resultado.mensaje);
      }
    });
  }

  handleFileInput(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imagePreview = document.getElementById(
          'imagePreview'
        ) as HTMLImageElement;
        imagePreview.src = e.target?.result as string;

        this.imagen = e.target?.result as string;
        this.usuarioDTO.imagenUser = this.imagen;
        console.log(this.imagen);
      };

      reader.readAsDataURL(selectedFile);
    }
  }
}
