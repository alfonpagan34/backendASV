import { UNIDADES_MEDIDA } from "./search.constants";

export interface Prediccion {
    temperatura: number;
    unidadTemperatura: UNIDADES_MEDIDA;
    probPrecipitacion: Array<ProbPrecipitacion>;
}

interface ProbPrecipitacion {
    value: string;
    periodo: string;
} 