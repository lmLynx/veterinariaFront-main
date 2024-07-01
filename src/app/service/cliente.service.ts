import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { response } from 'express';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/apiCliente/clientes';
  private httpHeaders = new HttpHeaders({
    TagContentType: 'application/json',
  });

  constructor(private http: HttpClient) { }

  mostrarClientes(): Observable<Cliente[]>{
    return this.http
    .get(this.urlEndPoint)
    .pipe(map((response) => response as Cliente[]));
  }

  mostrarCliente(id : number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  eliminarCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders
    });
  }

  crearCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(
      this.urlEndPoint, 
      cliente, 
      {
        headers: this.httpHeaders
      }
    );
  }

  actualizarCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(
      `${this.urlEndPoint}/${cliente.idCliente}`, 
      cliente, 
      {
        headers: this.httpHeaders
      }
    );
  }
}
