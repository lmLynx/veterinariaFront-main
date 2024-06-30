import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreacionUsuarioIn } from './dtos/usuario/creacion-usuario-in';
import { ModalInfoComponent } from './utiles/modal-info/modal-info.component';
import { MatDialog } from '@angular/material/dialog';
import { InicioUsuarioComponent } from './usuario/inicio-usuario/inicio-usuario.component';
import { UsuarioDTO } from './dtos/usuario/usuario.dto';
import { CreacionUsuarioOutDTO } from './dtos/usuario/creacion-usuario-out.dto';
import { environment } from 'src/environment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ServiciosVeterinariaService {

  // private baseUrl = 'http://localhost:8080/veteasdasfasdfrinaria'; // Reemplaza con la URL de tu backend
  private baseUrl = environment.apiUrl + "/veterinaria"; 

  constructor(private http: HttpClient,
    private dialog: MatDialog,
    ) { }

  crearNuevoUsuario(creacionUsuarioIn: CreacionUsuarioIn): Observable<CreacionUsuarioOutDTO> {
    return this.http.post<CreacionUsuarioOutDTO>(`${this.baseUrl}/usuario/crearUsuario`, creacionUsuarioIn);
  }

  consultarUsuarioExistente(correo: string, contrasena: string): Observable<UsuarioDTO> {
    const url = `${this.baseUrl}/usuario?correo=${correo}&contrasena=${contrasena}`;
    return this.http.get<UsuarioDTO>(url);
  }

  /**
   * Modal informativo
   */
  openInfoModal(message: string): void {
    this.dialog.open(ModalInfoComponent, {
      width: '400px',
      data: { mensaje: message },
    });
  }

  /**
   * modal de ingresar a la app
   */
  openIngresarModal(): void {
    this.dialog.open(InicioUsuarioComponent, {
      width: '350px',
      height: '550px',
      data: {  },
    });
  }

}
