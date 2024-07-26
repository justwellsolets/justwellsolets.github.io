import { Component, Input } from '@angular/core';
import { IAchievement } from '../../entities/achievement';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
})
export class AchievementsComponent {
  @Input() achievements: IAchievement[] = [];
}
