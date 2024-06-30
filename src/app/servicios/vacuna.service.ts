import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultadoDTO } from '../dtos/resultado.dto';
import { Observable } from 'rxjs';
import { CreacionVacunaInDTO } from '../dtos/vacuna/creacion-vacuna-in.dto';
import { AplicacionVacunaInDTO } from '../dtos/vacuna/aplicacion-vacuna-in.dto';
import { ConsultaVacunafiltrosInDTO } from '../dtos/vacuna/consulta-vacuna-filtros-in.dto';
import { ConsultaVacunafiltrosOutDTO } from '../dtos/vacuna/consulta-vacuna-filtros-out.dto';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class VacunaService {
  // private baseUrl = 'http://localhost:8080/veterinaria/vacuna';
  private baseUrl = environment.apiUrl + "/veterinaria/vacuna"; 

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  crearVacuna(inDTO: CreacionVacunaInDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/crearVacuna`, inDTO);
  }

  aplicarVacuna(inDTO: AplicacionVacunaInDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/aplicarVacuna`, inDTO);
  }

  consultarVacunasFiltros(inDTO: ConsultaVacunafiltrosInDTO): Observable<ConsultaVacunafiltrosOutDTO>{
    return this.http.post<ConsultaVacunafiltrosOutDTO>(`${this.baseUrl}/consultarVacunasFiltros`, inDTO);
  }

  editarVacuna(inDTO: CreacionVacunaInDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/editarVacuna`, inDTO);
  }
}
