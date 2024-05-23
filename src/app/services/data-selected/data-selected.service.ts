import { Injectable } from '@angular/core';
import { CarColor, CarConfiguration, CarOption } from '../car-configuration/car-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class DataSelectedService {
  private modelSelected?: CarOption;
  private colorSelected?: CarColor;
  private configSelected?: CarConfiguration;
  private wantYoke: boolean = false;
  private wantTowHitch: boolean = false;

  //Model Selected
  getModelSelected() {
    return this.modelSelected
  }
  setModelSelected(newModelSelected: CarOption) {
    this.modelSelected = newModelSelected;
  }

  //Color Selected
  getColorSelected() {
    return this.colorSelected
  }
  setColorSelected(newColorSelected: CarColor) {
    this.colorSelected = newColorSelected;
  }

  //Config Selected
  getConfigSelected() {
    return this.configSelected
  }
  setConfigSelected(newConfigSelected: CarConfiguration | undefined) {
    this.configSelected = newConfigSelected;
  }

  //Get Extras
  getWantYoke(): boolean{
    return this.wantYoke;
  }
  setWantYoke(newWantYoke: boolean): void{
    this.wantYoke = newWantYoke
  }
  getWantTowHitch(): boolean{
    return this.wantTowHitch;
  }
  setWantTowHitch(newWantTowHitch: boolean): void{
    this.wantTowHitch = newWantTowHitch
  }
  
}
