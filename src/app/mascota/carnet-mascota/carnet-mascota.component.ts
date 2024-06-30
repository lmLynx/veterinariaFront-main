import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConsultaMascotasUsuarioOutDTO } from 'src/app/dtos/mascota/consulta-mascotas-usuario-out.dto';
import { EditarMascotaInDTO } from 'src/app/dtos/mascota/editar-mascota-in.dto';
import { MascotaDTO } from 'src/app/dtos/mascota/mascota.dto';
import { UsuarioDTO } from 'src/app/dtos/usuario/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CarnetDetrasComponent } from '../carnet-detras/carnet-detras.component';

@Component({
  selector: 'app-carnet-mascota',
  templateUrl: './carnet-mascota.component.html',
  styleUrls: ['../../app.component.css', '../../css/principal.css'],
})
export class CarnetMascotaComponent {

  public carnetForm: FormGroup;
  public mascota: MascotaDTO;
  public nombreEditar: string;
  public edadEditar: number;
  public razaEditar: string;
  public tipoEditar: string;

  public imagen: string;
  public imagenOriginal: string;

  public usuarioDTO: UsuarioDTO;
  public consultaMascotasUsuarioOutDTO: ConsultaMascotasUsuarioOutDTO;

  actualizado: boolean = false;

  constructor(
    public dialog: MatDialog,
    private form: FormBuilder,
    public usuarioService: UsuarioService,
    private mascotaService: MascotaService,
    //modal
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CarnetMascotaComponent>,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.carnetForm = this.form.group({
      nombre: [''],
      edad: [''],
      raza: [''],
      tipo: [''],
      observacion: [''],
    });

    this.usuarioDTO = usuarioService.getUsuarioData();
    this.mascota = this.mascotaService.getMascotaData();
    console.log('mascota ' + this.mascota);

    this.carnetForm.get('nombre')?.setValue(this.mascota.nombre);
    this.carnetForm.get('edad')?.setValue(this.mascota.edad);
    this.carnetForm.get('raza')?.setValue(this.mascota.raza);
    this.carnetForm.get('tipo')?.setValue(this.mascota.tipoMascota);
    this.carnetForm.get('observacion')?.setValue(this.mascota.observacion);

    this.imagen = this.mascota.imagenMascota;
    this.imagenOriginal = this.mascota.imagenMascota;
  }

  volver() {
    if (!this.actualizado){
      this.mascota.imagenMascota = this.imagenOriginal;
    }
    this.dialogRef.close();
  }

  public get f() {
    return this.carnetForm.controls;
  }

  actualizarMascota() {
    let editarMascotaInDTO: EditarMascotaInDTO = new EditarMascotaInDTO();
    editarMascotaInDTO.idMascota = this.mascota.id;
    editarMascotaInDTO.imagen = this.imagen;
    editarMascotaInDTO.nombre = this.carnetForm.get('nombre')?.value;
    editarMascotaInDTO.edad = this.carnetForm.get('edad')?.value;
    editarMascotaInDTO.raza = this.carnetForm.get('raza')?.value;
    editarMascotaInDTO.tipoMascota = this.carnetForm.get('tipo')?.value;
    editarMascotaInDTO.observacion = this.carnetForm.get('observacion')?.value;

    this.mascotaService.editarMascota(editarMascotaInDTO).subscribe((res) => {
      if (res.exitoso) {
        this.mascotaService
          .consultarMascotasUsuario(this.usuarioDTO.idUser)
          .subscribe((resultado) => {
            this.consultaMascotasUsuarioOutDTO = resultado;
            if (resultado.exitoso) {
              this.actualizado = true;
              this.serviciosVeterinariaService.openInfoModal(
                '¡Mascota Editada!'
              );
              this.mascotaService.setMascotasData(
                this.consultaMascotasUsuarioOutDTO
              );
            } else {
              this.serviciosVeterinariaService.openInfoModal(resultado.mensaje);
            }
          });
      } else {
        this.serviciosVeterinariaService.openInfoModal(res.mensaje);
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

        this.imagen = e.target?.result as string;
        this.mascota.imagenMascota = this.imagen;
      };

      reader.readAsDataURL(selectedFile);
    }
  }

  voltearTarjeta() {
    console.log('voltear tarjeta');
    this.volver();

    const dialogoModal = this.dialog.open(CarnetDetrasComponent,{
      disableClose:true,
      width: '400px',
      height: '500px',
    });

  }
}
