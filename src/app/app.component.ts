import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UnsubscribeDirective } from './directives/unsubscribe.directive';
import { retry, takeUntil } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { IMyDetails } from './entities/me';
import dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.3s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent extends UnsubscribeDirective implements OnInit {
  public isLoading$ = this.loaderService.isLoading$;
  public myDetails!: IMyDetails;
  public isDarkMode = false;

  public totalExperience!: number;

  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.applyTheme();
    this.loadMyDetails();
  }

  private applyTheme() {
    this.isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const html = document.getElementsByTagName('html')[0];

    if (this.isDarkMode) {
      html.setAttribute('theme', 'dark');
    } else {
      html.setAttribute('theme', 'light');
    }
  }

  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    const html = document.getElementsByTagName('html')[0];
    if (this.isDarkMode) {
      html.setAttribute('theme', 'dark');
    } else {
      html.setAttribute('theme', 'light');
    }
  }

  private loadMyDetails() {
    this.loaderService.show();
    this.httpClient
      .get('assets/me.json')
      .pipe(takeUntil(this.unsubscribe$), retry(5))
      .subscribe({
        next: (me: any) => {
          this.myDetails = me;
          this.calculateTotalExperience();
          setTimeout(() => {
            this.loaderService.hide();
          }, 1000);
        },
        error: (e: any) => {
          console.error(e);
          this.loaderService.hide();
        },
      });
  }

  private calculateTotalExperience() {
    this.totalExperience = +(
      this.myDetails.experiences.reduce((totalExp: number, experience) => {
        totalExp =
          totalExp +
          dayjs(experience.end ?? new Date()).diff(
            experience.start,
            'months',
            true
          );
        return totalExp;
      }, 0) / 12
    ).toFixed(1);
  }
}
