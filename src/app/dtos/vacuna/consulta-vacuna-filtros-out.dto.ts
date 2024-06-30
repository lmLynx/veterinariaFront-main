import { ResultadoDTO } from "../resultado.dto";
import { VacunaDTO } from "./vacuna.dto";

export class ConsultaVacunafiltrosOutDTO extends ResultadoDTO{
    
    listaVacunas: VacunaDTO[] = []; 
}