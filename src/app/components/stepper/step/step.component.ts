import { Component, Input } from '@angular/core';
import { Step } from '../stepper.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'step',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {
  @Input() stepData?: Step;
}
