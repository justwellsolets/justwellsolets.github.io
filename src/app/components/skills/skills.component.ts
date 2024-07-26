import { Component, Input } from '@angular/core';
import { ISkill } from '../../entities/skill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  @Input() skills: ISkill[] = [];
}
