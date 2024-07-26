import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  takeUntil,
  throttleTime,
} from 'rxjs';
import { UnsubscribeDirective } from '../../directives/unsubscribe.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends UnsubscribeDirective {
  private navbar: any;
  @ViewChild('navbarHeader', { static: false }) set setNavbar(nav: ElementRef) {
    this.navbar = nav.nativeElement;
    this.initNavbarObserver();
  }

  private scroll$ = fromEvent(window, 'scroll').pipe(
    takeUntil(this.unsubscribe$),
    map((_) => window.scrollY > 10),
    distinctUntilChanged()
  );

  constructor(private router: Router) {
    super();
  }

  private initNavbarObserver() {
    this.scroll$.subscribe({
      next: (isStuck: boolean) => {
        if (isStuck) {
          this.navbar.classList.add('stuck');
        } else {
          this.navbar.classList.remove('stuck');
        }
      },
    });
  }
}
