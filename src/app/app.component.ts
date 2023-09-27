import { Component, OnInit } from '@angular/core';
import { Municipio } from './model/municipio';
import { Prediccion } from './model/prediccion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'asvApp';
  municipio!: Municipio;
  prediccion!: Prediccion;

  ngOnInit(): void {

  }

  recibirMunicipio(municipio: Municipio) {
    this.municipio = municipio;
  }

  recibirPrediccion(prediccion: Prediccion) {
    this.prediccion = prediccion;
  }


}
