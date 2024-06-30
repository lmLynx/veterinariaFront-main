import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioDTO } from 'src/app/dtos/usuario/usuario.dto';
import { ConsultaUsuariosFiltrosInDTO } from 'src/app/dtos/usuario/consulta-usuarios-filtros-in.dto';
import { ConsultaUsuariosFiltrosOutDTO } from 'src/app/dtos/usuario/consulta-usuarios-filtros-out.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearUsuarioControlComponent } from './crear-usuario-control/crear-usuario-control.component';
import { ConsultarUsuarioControlComponent } from './consultar-usuario-control/consultar-usuario-control.component';

@Component({
  selector: 'app-usuarios-control',
  templateUrl: './usuarios-control.component.html',
  styleUrls: ['../../../app.component.css', '../../../css/principal.css']
})
export class UsuariosControlComponent {

  public usuarios : UsuarioDTO[] = [];

  public usuarioForm: FormGroup;

  private consultaUsuariosFiltrosInDTO: ConsultaUsuariosFiltrosInDTO;
  private consultaUsuariosFiltrosOutDTO: ConsultaUsuariosFiltrosOutDTO;

  mostrarTabla: boolean = false;

  constructor(
    public dialog: MatDialog,
    private form: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private usuarioService: UsuarioService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.usuarioForm = this.form.group({
      cedula: [null],
      nombre: [null],
    });
    this.consultarUsuarios();
  }

  consultarUsuarios(){

    this.consultaUsuariosFiltrosInDTO = new ConsultaUsuariosFiltrosInDTO();
    this.consultaUsuariosFiltrosInDTO.cedula = this.usuarioForm.get('cedula')?.value;
    this.consultaUsuariosFiltrosInDTO.nombre = this.usuarioForm.get('nombre')?.value;

    this.usuarioService.consultarUsuariosFiltros(this.consultaUsuariosFiltrosInDTO).subscribe(res =>{
      this.consultaUsuariosFiltrosOutDTO = res;
      if (this.consultaUsuariosFiltrosOutDTO.exitoso){
        this.usuarios = this.consultaUsuariosFiltrosOutDTO.usuarios;
        this.mostrarTabla = true;
        this.cdRef.detectChanges();
      }else{
        this.serviciosVeterinariaService.openInfoModal(this.consultaUsuariosFiltrosOutDTO.mensaje);
        this.mostrarTabla = false;
      }
    });
  }

  consultarUser(user: UsuarioDTO){
    this.dialog.open(ConsultarUsuarioControlComponent, {
      data: { usuario: user },
      width: '400px', 
      disableClose:true
    });
    
  }

  agregarUsuario(){
    const dialogoModal=this.dialog.open(CrearUsuarioControlComponent, {
      width: '400px', 
      disableClose:true
    });

    dialogoModal.afterClosed().subscribe(e => {
      this.consultarUsuarios();
  });
  }

}
