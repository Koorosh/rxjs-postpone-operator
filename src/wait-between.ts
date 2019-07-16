import { Observable, zip, SchedulerLike, concat, of, Subject } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators' 
import { async } from 'rxjs/internal/scheduler/async';

export function waitBetween(duration: number, scheduler: SchedulerLike = async) {
  return <T>(source: Observable<T>) => 
    new Observable<T>(observer => {

      const source$ = new Subject<Number>();
      const signal$ = concat(of(0), source$.pipe(delay(duration)));

      return zip(source, signal$)
        .pipe(
          map<any, T>(([value, _]) => value),
          tap(_ => source$.next(1))
        )
        .subscribe({
          next(x) { observer.next(x); },
          error(err) { observer.error(err); },
          complete() { observer.complete(); }
        })
    })
};