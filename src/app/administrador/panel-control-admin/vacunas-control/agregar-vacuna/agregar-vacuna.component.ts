import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreacionVacunaInDTO } from 'src/app/dtos/vacuna/creacion-vacuna-in.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { VacunaService } from 'src/app/servicios/vacuna.service';

@Component({
  selector: 'app-agregar-vacuna',
  templateUrl: './agregar-vacuna.component.html',
  styleUrls: ['../../../../app.component.css', '../../../../css/principal.css'],
})
export class AgregarVacunaComponent {

  public vacunaForm: FormGroup;

  public submitted: boolean = false;

  public tiposMascota: string[] = ['PERRO', 'GATO', 'PEZ', 'AVE', 'ROEDOR'];

  creacionVacunaInDTO: CreacionVacunaInDTO = new CreacionVacunaInDTO();

  constructor(
    private form: FormBuilder,
    public usuarioService: UsuarioService,
    private vacunaService: VacunaService,
    private serviciosVeterinariaService: ServiciosVeterinariaService,
    // modal
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarVacunaComponent>
  ) {
    this.vacunaForm = this.form.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      observaciones: [''],
      unidades: [''],
    });
  }

  public get f() {
    return this.vacunaForm.controls;
  }

  volver() {
    this.dialogRef.close();
  }

  agregarVacuna() {

    if (this.vacunaForm.invalid){
      return;
    }

    this.creacionVacunaInDTO.nombre =  this.vacunaForm.get('nombre')?.value;
    this.creacionVacunaInDTO.tipoMascota =  this.vacunaForm.get('tipo')?.value;
    this.creacionVacunaInDTO.observaciones =  this.vacunaForm.get('observaciones')?.value;
    this.creacionVacunaInDTO.unidadades =  this.vacunaForm.get('unidades')?.value;

    this.vacunaService.crearVacuna(this.creacionVacunaInDTO).subscribe(res=>{
      if (res.exitoso){
        this.serviciosVeterinariaService.openInfoModal("Vacuna agregada exitosamente");
        this.volver();
      }  else{
        this.serviciosVeterinariaService.openInfoModal(res.mensaje);
      }
    });
  }

}
