import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Municipio } from 'src/app/model/municipio';
import { UNIDADES, UNIDADES_MEDIDA } from 'src/app/model/search.constants';
import { AemetService } from '../../services/aemet.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Prediccion } from 'src/app/model/prediccion';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() municipioEvent = new EventEmitter<Municipio>();
  @Output() prediccionEvent = new EventEmitter<Prediccion>();
  unidades!: typeof UNIDADES;
  unidad!: UNIDADES_MEDIDA;
  municipios: Array<Municipio> = [];
  formGroup!: FormGroup;

  constructor(private aemetService: AemetService, private fb : FormBuilder) {
    this.unidades = UNIDADES;
    this.initForm();
  }

  ngOnInit(): void {

  }

  initForm(){
    this.formGroup = this.fb.group({
      'municipio' : ['']
    })
    this.formGroup.get('municipio')?.valueChanges.subscribe((municipioString:string) => {
      if (municipioString.length > 2) {
        this.aemetService.getMunicipio(municipioString).subscribe( (municipios:Array<Municipio>) => {
          this.municipios = municipios;
        });
      }
    });
  }

  selectMunicipio(namefromAutocomplete: MatAutocompleteSelectedEvent) {
    this.municipioEvent.emit(namefromAutocomplete.option.value);
    this.aemetService.getMunicipio(namefromAutocomplete.option.value).subscribe( (municipios:Array<Municipio>) => {
      this.municipios = municipios;
      this.aemetService.getPrediccion(municipios[0].id,this.unidad).subscribe(prediccion => {
        console.log("PREDI: ",prediccion)
        this.prediccionEvent.emit(prediccion);
      });
    });
  }

  selectUnidad(unidad: UNIDADES_MEDIDA, event: any) {
    if (event.isUserInput) {
      this.unidad = unidad;
      if (this.municipios.length > 0) {
        // MEJORA: Tener los valores de las unidades en el front y no tener que pasar por el back para hacer el refresco de datos.
        this.aemetService.getPrediccion(this.municipios[0].id,this.unidad).subscribe(prediccion => {
          this.prediccionEvent.emit(prediccion);
        });
      }
    }
  }

}
