import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InformacionSistemaDTO } from 'src/app/dtos/info-sistema/informacion-sistema.dto';
import { ResultadoDTO } from 'src/app/dtos/resultado.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { InfoSistemaService } from 'src/app/servicios/info.sistema.service';

@Component({
  selector: 'app-sistema-control',
  templateUrl: './sistema-control.component.html',
  styleUrls: ['../../../app.component.css', '../../../css/principal.css'],
})
export class SistemaControlComponent {

  public sistemaForm: FormGroup;
  informacionSistemaDTO: InformacionSistemaDTO = new InformacionSistemaDTO();
  informacionSistemaEditarDTO: InformacionSistemaDTO = new InformacionSistemaDTO();

  constructor(
    private form: FormBuilder,
    private infoSistemaService: InfoSistemaService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.sistemaForm = this.form.group({
      correo: [null],
      horario: [null],
      telefono: [null],
      ubicacion: [null],
    });

    this.informacionSistemaDTO = this.infoSistemaService.getInfoSistemaData();
    this.sistemaForm.get('correo')?.setValue(this.informacionSistemaDTO.correo);
    this.sistemaForm.get('horario')?.setValue(this.informacionSistemaDTO.horariosAtencion);
    this.sistemaForm.get('telefono')?.setValue(this.informacionSistemaDTO.telefono);
    this.sistemaForm.get('ubicacion')?.setValue(this.informacionSistemaDTO.ubicacion);

  }

  editarInformacionActual(){
    this.informacionSistemaEditarDTO.id = this.informacionSistemaDTO.id;
    this.informacionSistemaEditarDTO.correo = this.sistemaForm.get('correo')?.value;
    this.informacionSistemaEditarDTO.horariosAtencion = this.sistemaForm.get('horario')?.value;
    this.informacionSistemaEditarDTO.telefono = this.sistemaForm.get('telefono')?.value;
    this.informacionSistemaEditarDTO.ubicacion = this.sistemaForm.get('ubicacion')?.value;

    this.infoSistemaService.editarInformacionActual(this.informacionSistemaEditarDTO).subscribe(res =>{
      let resultadoDTO: ResultadoDTO = res;

      if (resultadoDTO.exitoso){
        this.serviciosVeterinariaService.openInfoModal("Información editada exitosamente");
      }else{
        this.serviciosVeterinariaService.openInfoModal(resultadoDTO.mensaje);
      }
    });
  }


}
