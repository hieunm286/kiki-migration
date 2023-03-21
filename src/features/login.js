import { BehaviorSubject, catchError, EMPTY, map, scan, tap } from 'rxjs';
import { setSession } from '../utils/setSession';
import { applyLoginInput, combineApplyChanges } from '../features/loginInput';
import { rxServices } from '../apis/services';
import { curry } from 'lodash';
import { getKikiStatistic$, getTransferPlatformStatistic$ } from './statistic';
import { PLATFORMS } from '../utils/constants';
import { notifyError } from 'src/utils/notifications';
import i18n from 'src/locales/i18n';

export const initialFormValue = {
  email: 'cunghe@gmail.com',
  password: '123456',
};

// wgpjtgjpkwfhfv@eurokool.com
// Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjE4NTQ1MSwidXNlcm5hbWUiOiJ3Z3BqdGdqcGt3ZmhmdkBldXJva29vbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJ0ZWFtSWQiOjIxMzAwMTcsInRva2VuQ3JlYXRlZEF0IjoxNjc5Mzg4MjYwfQ.UNW4PrjX3ILCe0PuiSik1ofVdDSgkDrT4N4DMuMyV5E
export const initialTransferPlatformValue = {
  ...initialFormValue,
  platformToken: undefined,
  statistic: undefined,
  email: '',
  password: '',
};

function loginTransferPlatform(loginHelper$, change, state) {
  change({ ...state, isLoading: true });
  const platform = PLATFORMS.find((platform) => platform.name === state.platform);
  const login$ = loginHelper$(platform.loginUrl(), state).pipe(
    catchError((err) => {
      notifyError(i18n.t(err.data.reason));
      change({ ...state, isLoading: false });
      return EMPTY;
    }),
    tap((data) => {
      console.log(data);
      change({ ...state, isLoading: true, platformToken: data.data ?? data });
    }),
  );
  const statistic$ = getTransferPlatformStatistic$(login$, platform.getAllProfileUrl());
  return statistic$
    .pipe(
      catchError((err) => {
        notifyError(i18n.t(err.data.reason));
        change({ ...state, isLoading: false });
        return EMPTY;
      }),
    )
    .subscribe((ch) => {
      console.log('ch', ch);
      change({ ...state, password: '', isLoading: false, statistic: ch.data });
    });
}

function loginKiki(loginHelper$, change, state) {
  change({ ...state, isLoading: true });
  const login$ = loginHelper$(state).pipe(
    catchError((err) => {
      notifyError(i18n.t(err.data.reason));
      change({ ...state, isLoading: false });
      return EMPTY;
    }),
    tap((data) => {
      console.log(data);
      setSession(data.data.token);
    }),
  );
  const statistic$ = getKikiStatistic$(login$);

  return statistic$.subscribe((ch) => {
    console.log(ch);
    change({ ...state, password: '', isLoading: false, statistic: ch.data });
  });
}

function doLogout(change) {
  setSession(undefined);
  change({ ...initialFormValue, statistic: undefined });
}

function addTransitions(loginHelper$, change, state) {
  console.log(state);
  return {
    ...state,
    updateFormValue: (e) => {
      change({
        ...state,
        [e.target.name]: e.target.value,
      });
    },
    updatePlatform: (e) => {
      change({ ...state, platform: e.target.value });
    },
    onLogin: () =>
      state.platform ? loginTransferPlatform(loginHelper$, change, state) : loginKiki(loginHelper$, change, state),
    logout: () => (state.platform ? change(initialTransferPlatformValue) : doLogout(change)),
  };
}

export function manageFormKikiLogin$() {
  const change$ = new BehaviorSubject(initialFormValue);
  const state$ = change$.asObservable();

  function change(ch) {
    console.log({ ch });
    change$.next(ch);
  }

  const apply = combineApplyChanges(applyLoginInput);

  return state$.pipe(scan(apply, initialFormValue), map(curry(addTransitions)(rxServices.loginKiki$, change)));
}

export function manageFormTransferPlatformLogin$() {
  const change$ = new BehaviorSubject(initialTransferPlatformValue);
  const state$ = change$.asObservable();

  function change(ch) {
    console.log(ch);
    change$.next(ch);
  }

  const apply = combineApplyChanges(applyLoginInput);

  return state$.pipe(
    scan(apply, initialTransferPlatformValue),
    map(curry(addTransitions)(rxServices.loginTransferPlatform$, change)),
  );
}
