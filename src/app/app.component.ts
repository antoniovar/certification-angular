import { Component, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';
import { SecondStepComponent } from './pages/second-step/second-step.component';
import { DataSelectedService } from './services/data-selected/data-selected.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [AsyncPipe, JsonPipe, RouterOutlet, StepperComponent, SecondStepComponent],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  allowedSteps: boolean[] = [true, false, false]

  get imageUrl(): string | undefined {
    if (this.dataSelected.getModelSelected() && this.dataSelected.getColorSelected()) {
      return `https://interstate21.com/tesla-app/images/${this.dataSelected.getModelSelected()?.code}/${this.dataSelected.getColorSelected()?.code}.jpg`
    }
    return undefined;
  }
  get secondStepAllowed(): boolean {
    //Check if we have model and color selected
    return (this.dataSelected.getModelSelected() !== undefined && this.dataSelected.getColorSelected() !== undefined)
  }
  get thirdStepAllowed(): boolean {
    //Check if we have configuration selected
    return this.dataSelected.getConfigSelected() !== undefined;
  }

  constructor(private readonly dataSelected: DataSelectedService, private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    //When app load first time we want to be in the first step
    this.router.navigate(['/first-step', {}]);
  }

}
