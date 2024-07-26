import { Component, Input } from '@angular/core';
import { IEducation } from '../../entities/education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  @Input() educations: IEducation[] = [];
}
