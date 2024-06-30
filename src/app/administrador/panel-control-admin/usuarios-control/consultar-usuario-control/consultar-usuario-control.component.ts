import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsuarioDTO } from 'src/app/dtos/usuario/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';

@Component({
  selector: 'app-consultar-usuario-control',
  templateUrl: './consultar-usuario-control.component.html',
  styleUrls: ['../../../../app.component.css', '../../../../css/principal.css'],
})
export class ConsultarUsuarioControlComponent {
  
  public usuarioForm: FormGroup;
  usuario: UsuarioDTO;
  estado: string = "";

  constructor(
    public dialog: MatDialog,
    private form: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConsultarUsuarioControlComponent>,
    private serviciosVeterinariaService: ServiciosVeterinariaService,
  ) {

    this.usuarioForm = this.form.group({
      nombre: [''],
      estado: [''],
    });

    this.usuario = this.data.usuario;
    this.usuarioForm.get('nombre')?.setValue(this.usuario.nombre);
    if (this.usuario.activo){
      this.usuarioForm.get('estado')?.setValue('Activo');
      this.estado = 'Activo';
    }else{
      this.usuarioForm.get('estado')?.setValue('Inactivo');
      this.estado = 'Inactivo';
      
    }

  }

  volver() {
    this.dialogRef.close();
  }

}
