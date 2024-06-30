import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCitaComponent } from './agregar-cita/agregar-cita.component';
import { CitaMedicaService } from 'src/app/servicios/cita.medica.service';
import { UsuarioDTO } from 'src/app/dtos/usuario/usuario.dto';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ConsultasCitasUserOutDTO } from 'src/app/dtos/cita/consultas-citas-user-out.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { CitaMedicaDTO } from 'src/app/dtos/cita/cita-medica.dto';
import { ModalCancelarCitaComponent } from './modal-cancelar-cita/modal-cancelar-cita.component';
import { ModalConsultarCitaComponent } from './modal-consultar-cita/modal-consultar-cita.component';

@Component({
  selector: 'app-agenda-mascotas',
  templateUrl: './agenda-mascotas.component.html',
  styleUrls: ['../../app.component.css', '../../css/principal.css'],
})
export class AgendaMascotasComponent {
  public submitted: boolean = false;

  public usuarioDTO: UsuarioDTO;

  public consultasCitasUserOutDTO: ConsultasCitasUserOutDTO;

  public citas: CitaMedicaDTO[] = [];

  constructor(
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    public usuarioService: UsuarioService,
    public citaMedicaService: CitaMedicaService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.usuarioDTO = usuarioService.getUsuarioData();
    this.consultarCitasUsuario();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  consultarCitasUsuario() {
    this.citaMedicaService
      .consultarCitasUsuario(this.usuarioDTO.idUser)
      .subscribe((res) => {
        this.consultasCitasUserOutDTO = res;

        if (this.consultasCitasUserOutDTO.exitoso) {
          if (
            this.consultasCitasUserOutDTO.listaCitasMedicas != null &&
            this.consultasCitasUserOutDTO.listaCitasMedicas.length > 0
          ) {
            this.citas = this.consultasCitasUserOutDTO.listaCitasMedicas;
            console.log(this.citas);
          } else {
            console.log('aun no tienes citas');
          }
        } else {
          this.serviciosVeterinariaService.openInfoModal(
            this.consultasCitasUserOutDTO.mensaje
          );
        }
      });
  }

  irCrear() {
    const dialogoModal = this.dialog.open(AgregarCitaComponent, {
      data: { proceso: 'citaUsuario' },
      disableClose:true
    });

    dialogoModal.afterClosed().subscribe((e) => {
      this.consultarCitasUsuario();
    });
  }

  consultarCita(cita: CitaMedicaDTO) {
    this.dialog.open(ModalConsultarCitaComponent, {
      data: { cita: cita },
      width: '50%',
      disableClose:true
    });
  }

  cancelarCita(cita: CitaMedicaDTO) {
    const dialogoModal = this.dialog.open(ModalCancelarCitaComponent, {
      data: { cita: cita, proceso: 'usuario' },
      disableClose:true
    });

    dialogoModal.afterClosed().subscribe((e) => {
      this.consultarCitasUsuario();
    });
  }
}
