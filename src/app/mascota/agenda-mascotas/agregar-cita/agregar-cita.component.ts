import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CreacionCitaInDTO } from 'src/app/dtos/cita/creacion-cita-in.dto';
import { ConsultaMascotasUsuarioOutDTO } from 'src/app/dtos/mascota/consulta-mascotas-usuario-out.dto';
import { MascotaDTO } from 'src/app/dtos/mascota/mascota.dto';
import { ObjetoListaDTO } from 'src/app/dtos/objeto.lista.dto';
import { UsuarioDTO } from 'src/app/dtos/usuario/usuario.dto';
import { ConsultaUsuariosFiltrosInDTO } from 'src/app/dtos/usuario/consulta-usuarios-filtros-in.dto';
import { ConsultaUsuariosFiltrosOutDTO } from 'src/app/dtos/usuario/consulta-usuarios-filtros-out.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { CitaMedicaService } from 'src/app/servicios/cita.medica.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['../../../app.component.css', '../../../css/principal.css'],
})
export class AgregarCitaComponent {
  public citaForm: FormGroup;

  public submitted: boolean = false;
  public mostrarUsuario: boolean = false;

  public tiposCita: String[] = ['Vacunación', 'Baño'];

  public mascotas: MascotaDTO[] = [];

  public nombresMascotas: ObjetoListaDTO[] = [];

  public consultaMascotasUsuarioOutDTO: ConsultaMascotasUsuarioOutDTO;

  fechaSeleccionada: string;

  public usuarioDTO: UsuarioDTO;
  selectedDateTime: string = '';

  // implementacion creacion cita
  proceso: string;

  private consultaUsuariosFiltrosInDTO: ConsultaUsuariosFiltrosInDTO =
    new ConsultaUsuariosFiltrosInDTO();
  private consultaUsuariosFiltrosOutDTO: ConsultaUsuariosFiltrosOutDTO;
  public usuarios: ObjetoListaDTO[] = [];

  timeOptions: string[] = [
    '08:00 AM',
    '08:30 AM',
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 AM',
    '12:30 AM',
    '01:00 PM',
    '01:30 PM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
    '05:00 PM',
    '05:30 PM',
    '06:00 PM',
    '06:30 PM',
    '07:00 PM',
  ];

  constructor(
    public dialog: MatDialog,
    private form: FormBuilder,
    public usuarioService: UsuarioService,
    private mascotaService: MascotaService,
    private citaService: CitaMedicaService,
    private serviciosVeterinariaService: ServiciosVeterinariaService,
    //modal
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarCitaComponent>
  ) {
    this.citaForm = this.form.group({
      mascota: ['', Validators.required],
      fecha: ['', Validators.required],
      tipoCita: ['', Validators.required],
      hora: ['', Validators.required],
      observaciones: ['', Validators.required],
      usuario: [''],
    });

    this.proceso = data.proceso;
    this.usuarioDTO = usuarioService.getUsuarioData();
    //se recupera la lista de mascotas
    if (this.proceso === 'citaUsuario') {
      this.cargarListaMascotas();
    } else {
      this.mostrarUsuario = true;
      this.cargarListausuarios();
    }
  }

  cargarListaMascotas() {
    this.mascotaService.mascotasData$.subscribe((mascotas) => {
      this.consultaMascotasUsuarioOutDTO = mascotas;
      this.mascotas = this.consultaMascotasUsuarioOutDTO.listaMascotas;
    });

    this.mascotas.forEach((mascota) => {
      let objeto: ObjetoListaDTO = new ObjetoListaDTO();
      objeto.id = mascota.id;
      objeto.valor = mascota.nombre;
      this.nombresMascotas.push(objeto);
    });
  }

  /**
   * Metodo encargado de crear una cita asociada a una mascota
   */
  crearCita() {
    console.log(this.citaForm);
    this.submitted = true;
    if (this.citaForm.invalid) {
      return;
    }

    let citaIn: CreacionCitaInDTO = new CreacionCitaInDTO();
    citaIn.idMascota = this.citaForm.get('mascota')?.value;
    if (this.proceso === 'citaUsuario') {
      citaIn.idUser = this.usuarioDTO.idUser;
    }else{
      citaIn.idUser = this.citaForm.get('usuario')?.value;
    }
    citaIn.hora = this.citaForm.get('hora')?.value;
    citaIn.fecha = this.citaForm.get('fecha')?.value;
    citaIn.observacion = this.citaForm.get('observaciones')?.value;

    let tipo: string = '';
    if (this.citaForm.get('tipoCita')?.value === 'Vacunación') {
      citaIn.tipoCitaMascotaEnum = 'VACUNACION';
    } else {
      citaIn.tipoCitaMascotaEnum = 'BANIO';
    }

    this.citaService.crearCita(citaIn).subscribe((res) => {
      if (res.exitoso) {
        this.serviciosVeterinariaService.openInfoModal(
          'Cita agendada exitosamente'
        );
        this.volver();
        return;
      }
      this.serviciosVeterinariaService.openInfoModal(res.mensaje);
    });
  }

  volver() {
    this.dialogRef.close();
  }

  public get f() {
    return this.citaForm.controls;
  }

  cargarListausuarios() {
    this.usuarioService
      .consultarUsuariosFiltros(this.consultaUsuariosFiltrosInDTO)
      .subscribe((res) => {
        this.consultaUsuariosFiltrosOutDTO = res;
        if (this.consultaUsuariosFiltrosOutDTO.exitoso) {
          // this.usuarios = this.consultaUsuariosFiltrosOutDTO.usuarios;

          this.consultaUsuariosFiltrosOutDTO.usuarios.forEach((usuario) => {
            let objeto: ObjetoListaDTO = new ObjetoListaDTO();
            objeto.id = usuario.idUser;
            objeto.valor = usuario.nombre + ' - ' + usuario.cedula;
            this.usuarios.push(objeto);
          });
        } else {
          this.serviciosVeterinariaService.openInfoModal(
            this.consultaUsuariosFiltrosOutDTO.mensaje
          );
        }
      });
  }

  seleccionarUsuario(user: any) {
    console.log('usuario seleccionado ' + this.citaForm.get('usuario')?.value);
    this.cargarListaMascotasIdUser(this.citaForm.get('usuario')?.value);
  }

  cargarListaMascotasIdUser(idUser: number) {
    this.mascotaService
      .consultarMascotasUsuario(idUser)
      .subscribe((resultado) => {
        if (resultado.exitoso) {
          this.consultaMascotasUsuarioOutDTO = resultado;

          this.consultaMascotasUsuarioOutDTO.listaMascotas.forEach((mascota) => {
            let objeto: ObjetoListaDTO = new ObjetoListaDTO();
            objeto.id = mascota.id;
            objeto.valor = mascota.nombre;
            this.nombresMascotas.push(objeto);
          });

        } else {
          this.serviciosVeterinariaService.openInfoModal(
            this.consultaMascotasUsuarioOutDTO.mensaje
          );
        }
      });
  }
}
