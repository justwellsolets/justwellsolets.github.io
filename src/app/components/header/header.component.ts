import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, takeUntil } from 'rxjs';
import { UnsubscribeDirective } from '../../directives/unsubscribe.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends UnsubscribeDirective {
  @Input() isDarkMode = false;

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

  private initNavbarObserver() {
    this.scroll$.subscribe({
      next: (isStuck: boolean) => {
        if (isStuck) {
          this.navbar.classList.add('shadow');
        } else {
          this.navbar.classList.remove('shadow');
        }
      },
    });
  }
}
