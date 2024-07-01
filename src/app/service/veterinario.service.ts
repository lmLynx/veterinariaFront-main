import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { response } from 'express';
import { Veterinario } from '../model/Veterinario';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private urlEndPoint: string = 'http://localhost:8080/apiVeterinario/veterinarios';
  private httpHeaders = new HttpHeaders({
    TagContentType: 'application/json',
  });

  constructor(private http: HttpClient) { }

  mostrarVeterinarios(): Observable<Veterinario[]>{
    return this.http
    .get(this.urlEndPoint)
    .pipe(map((response) => response as Veterinario[]));
  }

  mostrarVeterinario(id : number): Observable<Veterinario>{
    return this.http.get<Veterinario>(`${this.urlEndPoint}/${id}`);
  }

  eliminarVeterinario(id: number): Observable<Veterinario>{
    return this.http.delete<Veterinario>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders
    });
  }

  crearVeterinario(veterinario: Veterinario): Observable<Veterinario>{
    return this.http.post<Veterinario>(
      this.urlEndPoint, 
      veterinario, 
      {
        headers: this.httpHeaders
      }
    );
  }

  actualizarVeterinario(veterinario: Veterinario): Observable<Veterinario>{
    return this.http.put<Veterinario>(
      `${this.urlEndPoint}/${veterinario.idVeterinario}`, 
      veterinario, 
      {
        headers: this.httpHeaders
      }
    );
  }
}
