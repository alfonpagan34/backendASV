import { Pipe, PipeTransform } from '@angular/core';
import { UNIDADES_MEDIDA } from 'src/app/model/search.constants';

@Pipe({name: 'UnidadPipe'})
export class UnidadPipe implements PipeTransform {

  transform(unidad:UNIDADES_MEDIDA, args?: any):string {
    if (unidad !== null && unidad !== undefined) {
        if (unidad === UNIDADES_MEDIDA.G_KEL) return 'K';
        else if (unidad === UNIDADES_MEDIDA.G_FAH) return 'ºF';
        else return 'ºC';
    }
    return '';
  }

}