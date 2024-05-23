import { Component, OnInit } from '@angular/core';
import { CarColor, CarConfiguration, CarConfigurationAndOptions, CarConfigurationService, CarOption } from '../../services/car-configuration/car-configuration.service';
import { take, tap } from 'rxjs';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { DataSelectedService } from '../../services/data-selected/data-selected.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'second-step',
  standalone: true,
  imports: [DropdownComponent, CommonModule],
  templateUrl: './second-step.component.html',
  styleUrl: './second-step.component.scss'
})
export class SecondStepComponent implements OnInit {
  carConfigurationAndOptions!: CarConfigurationAndOptions;
  configOptions: CarConfiguration[] = [];
  isReady: boolean = false;
  hitchChecked?: boolean;
  yokeChecked?: boolean;

  get selectedConfig(): CarConfiguration | undefined {
    return this.dataSelected.getConfigSelected();
  }

  constructor(private readonly dataService: CarConfigurationService, private readonly dataSelected: DataSelectedService) { }

  ngOnInit(): void {
    this.getCarConfiguration();
    this.hitchChecked = this.dataSelected.getWantTowHitch();
    this.yokeChecked = this.dataSelected.getWantYoke();
  }

  /* Initialize data and values */
  getCarConfiguration(): void {
    this.dataService.getCarConfigurations().pipe(
      take(1),
      tap(configuration => {
        //Save all options with colors
        this.carConfigurationAndOptions = configuration;
        this.configOptions = configuration.configs;
        //Assign last option selected or first array option if no one were selected yet
        if(!this.dataSelected.getConfigSelected()){
          this.dataSelected.setConfigSelected(this.configOptions[0])
        }
        this.isReady = true;
      })
    ).subscribe();
  }

  /* Dropdown selected */
  changeSelectedoption(option: CarOption | CarColor | CarConfiguration): void {
    const newConfigSelected = option as CarConfiguration;
    this.dataSelected.setConfigSelected(newConfigSelected)
  }

  //Extras checked|unchecked
  changedExtras(e: Event, type:string){
    const currentCheckbox = e.currentTarget as HTMLInputElement
    if(type==='hitch'){
      this.dataSelected.setWantTowHitch(currentCheckbox.checked)
    }else{
      this.dataSelected.setWantYoke(currentCheckbox.checked)
    }
  }
}
