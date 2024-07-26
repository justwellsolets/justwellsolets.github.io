import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnsubscribeDirective } from './directives/unsubscribe.directive';
import { takeUntil } from 'rxjs';
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
        animate('0.3s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.3s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent extends UnsubscribeDirective implements OnInit {
  public isLoading$ = this.loaderService.isLoading$;
  public myDetails!: IMyDetails;

  public totalExperience!: number;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private loaderService: LoaderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadMyDetails();
  }

  private loadMyDetails() {
    this.loaderService.show();
    this.httpClient
      .get('assets/me.json')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (me: any) => {
          console.log(me);
          this.myDetails = me;
          this.calculateTotalExperience();
          this.loaderService.hide();
        },
        error: (e: any) => {
          console.error(e);
          this.loaderService.hide();
        },
      });
  }

  public navigateRoot() {
    this.router.navigate(['/'], { replaceUrl: true });
    window.scrollTo({
      top: 0,
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
