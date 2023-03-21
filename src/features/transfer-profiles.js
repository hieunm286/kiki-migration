import { BehaviorSubject, catchError, EMPTY, interval, startWith, switchMap, takeWhile, tap } from 'rxjs';
import { rxServices } from '../apis/services';

export const transferProgressStatus = {
  nothing: -1,
  transferring: 0,
  done: 1,
};

export const every1Seconds$ = interval(1000).pipe(startWith(0));

export const handleTransferProfile = (manageTransferProfiles$) => {
  return rxServices
    .transferProfiles$()
    .pipe(
      tap((data) => {
        console.log(data);
        manageTransferProfiles$.next({ transferStatus: transferProgressStatus.transferring });
      }),
      catchError((err) => {
        console.log(err);
        return EMPTY;
      }),
    )
    .pipe(
      switchMap((data) =>
        every1Seconds$.pipe(
          switchMap(() =>
            rxServices.transferringProgress$().pipe(
              tap((data) => {
                console.log('data', data);
                if (data === 'Done') {
                  manageTransferProfiles$.next({ transferStatus: transferProgressStatus.done, profiles: data });
                } else {
                  manageTransferProfiles$.next({ ...manageTransferProfiles$.getValue(), profiles: data });
                }
              }),
            ),
          ),
          takeWhile((profiles) => {
            console.log({ profiles });
            return profiles !== 'Done';
          }),
        ),
      ),
    )
    .subscribe();
};

const initialValue = {
  transferStatus: transferProgressStatus.nothing,
  profiles: -1,
};

export const manageTransferProfiles$ = new BehaviorSubject(initialValue);
