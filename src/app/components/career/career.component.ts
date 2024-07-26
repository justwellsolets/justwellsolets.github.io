import { Component, Input } from '@angular/core';
import { IExperience } from '../../entities/experience';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss',
})
export class CareerComponent {
  @Input() experiences: IExperience[] = [];
}
