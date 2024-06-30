import { ResultadoDTO } from "../resultado.dto";
import { CitaMedicaDTO } from "./cita-medica.dto";

export class ConsultasCitasUserOutDTO  extends ResultadoDTO{

    listaCitasMedicas :CitaMedicaDTO[] = [];

}