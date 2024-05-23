import { Component, OnInit } from '@angular/core';
import { DataSelectedService } from '../../services/data-selected/data-selected.service';
import { CarColor, CarConfiguration, CarOption } from '../../services/car-configuration/car-configuration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'third-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './third-step.component.html',
  styleUrl: './third-step.component.scss'
})
export class ThirdStepComponent implements OnInit{
  modelSelected?: CarOption;
  selectedConfig?: CarConfiguration;
  colorSelected?: CarColor;
  wantHitch: boolean = false;
  wantYoke: boolean = false;
  totalCost?: number;
  constructor(private readonly dataSelected: DataSelectedService){}

  ngOnInit(): void {
    //Initialize selected data
    this.modelSelected = this.dataSelected.getModelSelected();
    this.selectedConfig = this.dataSelected.getConfigSelected();
    this.colorSelected = this.dataSelected.getColorSelected();
    this.wantHitch = this.dataSelected.getWantTowHitch();
    this.wantYoke = this.dataSelected.getWantYoke();
    this.calculateTotalCost();
  }

  calculateTotalCost(){
    const colorCost = this.colorSelected?.price ?? 0;
    const modelCost = this.selectedConfig?.price ?? 0;
    const wantYokeCost = this.wantYoke ? 1000 : 0;
    const wantHitchCost = this.wantHitch ? 1000 : 0;
    this.totalCost = colorCost + modelCost + wantYokeCost + wantHitchCost;
  }

}
