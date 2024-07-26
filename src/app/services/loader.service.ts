import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderIndicator$ = new BehaviorSubject(true);
  public isLoading$ = this.loaderIndicator$.asObservable();

  public show() {
    this.loaderIndicator$.next(true);
  }

  public hide() {
    this.loaderIndicator$.next(false);
  }
}
