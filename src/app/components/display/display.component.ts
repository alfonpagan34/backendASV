import { Component, Input, OnInit } from '@angular/core';
import { Municipio } from 'src/app/model/municipio';
import { Prediccion } from 'src/app/model/prediccion';
import { AemetService } from 'src/app/services/aemet.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit{

  @Input() municipio!: Municipio; 
  @Input() prediccion!: Prediccion;

  today!: Date;
  tomorrowDate!: Date;

  constructor() {
    this.today = new Date();
    this.tomorrowDate = new Date();
    this.tomorrowDate.setDate(this.today.getDate()+1);
  }

  ngOnInit(): void {

  }


}
