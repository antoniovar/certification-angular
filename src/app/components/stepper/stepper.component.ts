import { Component, Input } from '@angular/core';
import { StepComponent } from './step/step.component';

@Component({
  selector: 'stepper',
  standalone: true,
  imports: [StepComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  @Input() allowedSteps: boolean[] = [false, true, true];

  get steps(): Step[] {
    return [
      { label: 'Step 1', route: '/first-step', isDisabled: this.allowedSteps[0] },
      { label: 'Step 2', route: '/second-step', isDisabled: this.allowedSteps[1] },
      { label: 'Step 3', route: '/third-step', isDisabled: this.allowedSteps[2] }
    ]
  }
}

export interface Step {
  label: string;
  route: string;
  isDisabled: boolean;
}
