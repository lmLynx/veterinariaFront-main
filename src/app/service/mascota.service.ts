import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { response } from 'express';
import { Mascota } from '../model/Mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private urlEndPoint: string = 'http://localhost:8080/apiMascota/mascotas';
  private httpHeaders = new HttpHeaders({
    TagContentType: 'application/json',
  });

  constructor(private http: HttpClient) { }

  mostrarMascotas(): Observable<Mascota[]>{
    return this.http
    .get(this.urlEndPoint)
    .pipe(map((response) => response as Mascota[]));
  }

  mostrarMascota(id : number): Observable<Mascota>{
    return this.http.get<Mascota>(`${this.urlEndPoint}/${id}`);
  }

  eliminarMascota(id: number): Observable<Mascota>{
    return this.http.delete<Mascota>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders
    });
  }

  crearMascota(mascota: Mascota): Observable<Mascota>{
    return this.http.post<Mascota>(
      this.urlEndPoint, 
      mascota, 
      {
        headers: this.httpHeaders
      }
    );
  }

  actualizarMascota(mascota: Mascota): Observable<Mascota>{
    return this.http.put<Mascota>(
      `${this.urlEndPoint}/${mascota.idMascota}`, 
      mascota, 
      {
        headers: this.httpHeaders
      }
    );
  }
}
