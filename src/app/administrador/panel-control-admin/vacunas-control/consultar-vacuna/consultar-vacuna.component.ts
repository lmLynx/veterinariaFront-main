import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreacionVacunaInDTO } from 'src/app/dtos/vacuna/creacion-vacuna-in.dto';
import { VacunaDTO } from 'src/app/dtos/vacuna/vacuna.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { VacunaService } from 'src/app/servicios/vacuna.service';

@Component({
  selector: 'app-consultar-vacuna',
  templateUrl: './consultar-vacuna.component.html',
  styleUrls: ['../../../../app.component.css', '../../../../css/principal.css'],
})
export class ConsultarVacunaComponent {

  vacuna: VacunaDTO;

  public vacunaForm: FormGroup;
  
  creacionVacunaInDTO: CreacionVacunaInDTO = new CreacionVacunaInDTO();

  constructor(
    public dialog: MatDialog,
    private form: FormBuilder,
    private vacunaService: VacunaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConsultarVacunaComponent>,
    private serviciosVeterinariaService: ServiciosVeterinariaService,
  ) {

    this.vacunaForm = this.form.group({
      observacion: [''],
      nombre: [''],
      tipo: [''],
      unidades: [''],
    });

    this.vacuna = this.data.vacuna;
    this.vacunaForm.get('observacion')?.setValue(this.vacuna.observaciones);
    this.vacunaForm.get('nombre')?.setValue(this.vacuna.nombre);
    this.vacunaForm.get('tipo')?.setValue(this.vacuna.tipoMascota);
    this.vacunaForm.get('unidades')?.setValue(this.vacuna.unidadDisponible);

  }

  volver() {
    this.dialogRef.close();
  }

  actualizarVacuna(){
    this.creacionVacunaInDTO.nombre =  this.vacunaForm.get('nombre')?.value;
    this.creacionVacunaInDTO.tipoMascota =  this.vacunaForm.get('tipo')?.value;
    this.creacionVacunaInDTO.observaciones =  this.vacunaForm.get('observaciones')?.value;
    this.creacionVacunaInDTO.unidadades =  this.vacunaForm.get('unidades')?.value;
    this.creacionVacunaInDTO.idVacuna = this.vacuna.id;

    this.vacunaService.editarVacuna(this.creacionVacunaInDTO).subscribe(res=>{
      if (res.exitoso){
        this.serviciosVeterinariaService.openInfoModal("Vacuna editada exitosamente");
        this.volver();
      }  else{
        this.serviciosVeterinariaService.openInfoModal(res.mensaje);
      }
    });
  }
}
