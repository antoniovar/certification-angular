import { Component, OnInit } from '@angular/core';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { CarConfigurationService, CarOption, CarColor, CarConfiguration } from '../../services/car-configuration/car-configuration.service';
import { take, tap } from 'rxjs';
import { DataSelectedService } from '../../services/data-selected/data-selected.service';

@Component({
  selector: 'first-step',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './first-step.component.html',
})
export class FirstStepComponent implements OnInit {
  carOptions: CarOption[] = [];
  isReady: boolean = false;

  constructor(private readonly dataService: CarConfigurationService, private readonly dataSelected: DataSelectedService) { }
  
  get colorOptions(): CarColor[] | undefined {
    if (this.modelSelected) {
      return this.modelSelected.colors;
    }
    return undefined
  }
  get modelSelected(): CarOption | undefined{
    return this.dataSelected.getModelSelected();
  }
  get colorSelected(): CarColor | undefined{
    return this.dataSelected.getColorSelected();
  }

  ngOnInit(): void {
    this.getCarOptions();
  }

  /* Initialize data and values */
  getCarOptions(): void {
    this.dataService.getCarOptions().pipe(
      take(1),
      tap(carOptions => {
        //Save all options with colors
        this.carOptions = carOptions;
        this.isReady = true
      })
    ).subscribe();
  }

  /* Dropdown selected */
  changeSelectedoption(option: CarOption | CarColor | CarConfiguration, type: string): void {
    if (type === 'model') {
      if (option.description !== this.dataSelected?.getModelSelected()?.description) {
        //If we change the model, we also have to unselect the config. Each model can have different configs
        this.dataSelected.setConfigSelected(undefined);
      }
      const model = option as CarOption;
      this.dataSelected.setModelSelected(model)
      //If we change the model we preselect again first color, to assure the color selected is correct
      this.dataSelected.setColorSelected(model.colors[0])
      
    } else {
      const color = option as CarColor
      this.dataSelected.setColorSelected(color)
    }
  }
}

export interface OptionsSelected {
  model: CarOption;
  color: CarColor;
}
