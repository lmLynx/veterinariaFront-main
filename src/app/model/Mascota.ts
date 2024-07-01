import { Cliente } from "./Cliente";

export class Mascota{
    idMascota: number=0;
    nombre: string='';
    especie: string='';
    raza: string='';
    idCliente: Cliente = new Cliente();
}