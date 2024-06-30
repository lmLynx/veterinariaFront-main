import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-panel-control-admin',
  templateUrl: './panel-control-admin.component.html',
  styleUrls: ['../../app.component.css', '../../css/principal.css']
})
export class PanelControlAdminComponent {

    //mostrar u ocultar informacion de pantalla
    public mostrarCitasB: boolean = true;
    public mostrarSistemaB: boolean = true;
    public mostrarVacunasB: boolean = false;
    public mostrarUsuariosB: boolean = false;

  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
  ) {}

  volver() {
    this.router.navigate(['/']);
  }

  mostrarCitas(){
    this.mostrarCitasB = true;
    this.mostrarUsuariosB = false;
    this.mostrarVacunasB = false;
    this.mostrarSistemaB = false;
    
  }
  
  mostrarVacunas(){
    this.mostrarCitasB = false;
    this.mostrarUsuariosB = false;
    this.mostrarVacunasB = true;
    this.mostrarSistemaB = false;
  }
  
  mostrarClientes(){
    this.mostrarCitasB = false;
    this.mostrarUsuariosB = true;
    this.mostrarVacunasB = false;
    this.mostrarSistemaB = false;
  }
  
  mostrarsistema(){
    this.mostrarCitasB = false;
    this.mostrarUsuariosB = false;
    this.mostrarVacunasB = false;
    this.mostrarSistemaB = true;
  }
}
