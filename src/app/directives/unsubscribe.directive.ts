import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appUnsubscribe]',
})
export class UnsubscribeDirective implements OnDestroy {
  protected unsubscribe$ = new Subject<null>();

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
