import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSelectedService } from '../data-selected/data-selected.service';

@Injectable({
  providedIn: 'root'
})
export class CarConfigurationService {

  constructor(private readonly http: HttpClient, private readonly dataSelected: DataSelectedService) { }

  //Obtain model & color possible options
  getCarOptions(): Observable<CarOption[]>{
    return this.http.get<CarOption[]>('/models')
  }
  //Obtain car configuration possible options
  getCarConfigurations(): Observable<CarConfigurationAndOptions>{
    return this.http.get<CarConfigurationAndOptions>(`/options/${this.dataSelected.getModelSelected()?.code}`)
  }
}

export interface CarOption{
  code: string;
  description: string;
  colors: CarColor[];
}
export interface CarColor {
  code: string;
  description: string;
  price: number;
}
export interface CarConfigurationAndOptions {
  configs: CarConfiguration[];
  towHitch: boolean; 
  yoke: boolean;
}
export interface CarConfiguration {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}