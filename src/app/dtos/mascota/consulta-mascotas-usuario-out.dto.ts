import { ResultadoDTO } from "../resultado.dto";
import { MascotaDTO } from "./mascota.dto";

export class  ConsultaMascotasUsuarioOutDTO extends ResultadoDTO{
    listaMascotas: MascotaDTO[] = []; 
}