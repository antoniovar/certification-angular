import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CarColor, CarConfiguration, CarOption } from '../../services/car-configuration/car-configuration.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  @Input() options: CarOption[] | CarColor[] | CarConfiguration[] = [];
  @Input() selectedOption?: CarOption | CarColor | CarConfiguration;
  @Input() dropdownId!: string;
  @Output() changeSelected = new EventEmitter<CarOption | CarColor | CarConfiguration>();

  selectedOptionDescription?: string;

  //If the selected option has changed need to change also the description
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedOption']) {
      this.selectedOptionDescription = this.selectedOption?.description;
    }
  }

  //When we load the component if we dont have any option selected whe should preselect first option
  ngOnInit(): void {
    if (!this.selectedOption) {
      this.selectedOption = this.options[0];
    }
    this.selectedOptionDescription = this.selectedOption.description;
    this.changeSelected.emit(this.selectedOption)
  }

  changeSelectedOption(): void {
    this.selectedOption = this.options.find(option => option.description === this.selectedOptionDescription)
    this.changeSelected.emit(this.selectedOption)
  }

}

