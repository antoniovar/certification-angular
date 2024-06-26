import { Routes } from '@angular/router';
import { FirstStepComponent } from './pages/first-step/first-step.component';
import { SecondStepComponent } from './pages/second-step/second-step.component';
import { ThirdStepComponent } from './pages/third-step/third-step.component';

export const routes: Routes = [
  { path: 'first-step', component: FirstStepComponent },
  { path: 'second-step', component: SecondStepComponent },
  { path: 'third-step', component: ThirdStepComponent },
  { path: '**', redirectTo: 'first-step', pathMatch: 'full' }
];


