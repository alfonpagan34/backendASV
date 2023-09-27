import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Municipio } from "../model/municipio";
import { UNIDADES_MEDIDA } from "../model/search.constants";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    params: new HttpParams()
};

@Injectable({
    providedIn: 'root'
})
export class AemetService {

    baseUrl: string = 'http://localhost:8080/aemet';
    
    constructor(private http: HttpClient) {}

    public getMunicipio(nombre: string): Observable<Array<Municipio>> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("nombre", nombre);
        httpOptions.params = queryParams;
        return this.http.get<Array<Municipio>>(this.baseUrl+'/municipios',httpOptions);
    }  

    public getPrediccion(nombreMunicipio: string,unidad: UNIDADES_MEDIDA = UNIDADES_MEDIDA.G_CEL): Observable<any> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("unidad", unidad);
        httpOptions.params = queryParams;
        return this.http.get<any>(this.baseUrl+'/municipios/'+`${nombreMunicipio}/prediccion`,httpOptions);
    }

}