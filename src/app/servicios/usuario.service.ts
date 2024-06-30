import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditarUsuarioMascotaInDTO } from '../dtos/usuario/editar-usuario-mascota-in.dto';
import { ResultadoDTO } from '../dtos/resultado.dto';
import { ActivarCuentaDTO } from '../dtos/activacion-cuenta/activar-cuenta.dto';
import { EnvioCorreoInDTO } from '../dtos/activacion-cuenta/envio-correo-in.dto';
import { ConsultaUsuariosFiltrosOutDTO } from '../dtos/usuario/consulta-usuarios-filtros-out.dto';
import { ConsultaUsuariosFiltrosInDTO } from '../dtos/usuario/consulta-usuarios-filtros-in.dto';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioData = new BehaviorSubject<any>(null);
  usuarioData$ = this.usuarioData.asObservable();
  // private baseUrl = 'aaaaaaaaaaaaaa/veterinaria/usuario';
  private baseUrl = environment.apiUrl + "/veterinaria/usuario"; 

  constructor(private http: HttpClient,) {}

  setUsuarioData(data: any) {
    this.usuarioData.next(data);
  }

  getUsuarioData() {
    return this.usuarioData.getValue();
  }

  editarUsuario(editarUsuarioIn: EditarUsuarioMascotaInDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/editarUsuario`, editarUsuarioIn);
  }

  mandarCorreoValidacion(envioCorreoInDTO: EnvioCorreoInDTO): Observable<ResultadoDTO>{
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/mandarCorreoValidacion`, envioCorreoInDTO)
  }

  activarCuenta(activarCuentaDTO: ActivarCuentaDTO): Observable<ResultadoDTO> {
    const url = `${this.baseUrl}/activarCuenta`;
    return this.http.post<ResultadoDTO>(url, activarCuentaDTO);
  }

  consultarUsuariosFiltros(inDTO: ConsultaUsuariosFiltrosInDTO): Observable<ConsultaUsuariosFiltrosOutDTO> {
    return this.http.post<ConsultaUsuariosFiltrosOutDTO>(`${this.baseUrl}/consultarUsuariosFiltros`, inDTO);
  }
}
