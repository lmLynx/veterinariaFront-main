import { Cliente } from "./Cliente";
import { Mascota } from "./Mascota";
import { Veterinario } from "./Veterinario";

export class Consulta {
    idConsulta: number = 0;
    fecha: Date = new Date();
    motivo: string = '';
    diagnostico: string = '';
    idMascota: Mascota = new Mascota(); 
    idVeterinario: Veterinario = new Veterinario(); 
}