import { BehaviorSubject, catchError, EMPTY, interval, startWith, switchMap, takeWhile, tap } from 'rxjs';
import { rxServices } from '../apis/services';
import { notifyError, notifySuccess } from 'src/utils/notifications.js';

export const transferProgressStatus = {
  nothing: -1,
  transferring: 0,
  done: 1,
};

export const every1Seconds$ = interval(1000).pipe(startWith(0));

export const listenTransferStatus$ = (manageTransferProfiles$, platform, token) => {
  if (!platform) return;
  return every1Seconds$.pipe(
    switchMap(() =>
      rxServices.transferringProgress$(platform.getTransferProfilesProgressUrl()).pipe(
        tap((data) => {
          manageTransferProfiles$.next({ ...manageTransferProfiles$.getValue(), profiles: data?.data });
        }),
      ),
    ),
    takeWhile(() => !!token),
  );
};

export const handleTransferProfile$ = (manageTransferProfiles$, platform, platformToken, kikiToken) => {
  if (!platform) return;
  manageTransferProfiles$.next({ transferStatus: transferProgressStatus.transferring });
  return rxServices
    .transferProfiles$(platform.transferProfilesUrl(), { token: platformToken, kikiToken })
    .pipe(
      tap((data) => {
        notifySuccess('Chuyển đổi thành công');
        manageTransferProfiles$.next({ transferStatus: transferProgressStatus.done });
      }),
      catchError((err) => {
        notifyError(err.data.reason);
        manageTransferProfiles$.next({ transferStatus: transferProgressStatus.nothing });
        return EMPTY;
      }),
    )
    .subscribe();
};

const initialValue = {
  transferStatus: transferProgressStatus.nothing,
  profiles: -1,
};

export const manageTransferProfiles$ = new BehaviorSubject(initialValue);
