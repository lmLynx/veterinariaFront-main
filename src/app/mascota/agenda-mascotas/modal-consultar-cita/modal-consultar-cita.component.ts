import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CitaMedicaDTO } from 'src/app/dtos/cita/cita-medica.dto';

@Component({
  selector: 'app-modal-consultar-cita',
  templateUrl: './modal-consultar-cita.component.html',
  styleUrls: ['../../../app.component.css', '../../../css/principal.css'],
})
export class ModalConsultarCitaComponent {

  citaConsultar : CitaMedicaDTO ;
  vacunacion: boolean;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalConsultarCitaComponent>,
  ) {
    this.citaConsultar = this.data.cita;
    console.log(data.cita);
    this.vacunacion = this.citaConsultar.tipoCitaMascotaEnum === 'VACUNACION';
  }

  volver() {
    this.dialogRef.close();
  }
}
