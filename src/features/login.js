import { BehaviorSubject, map, scan, tap } from 'rxjs';
import { setSession, setSessionLocal } from '../utils/setSession';
import { applyLoginInput, combineApplyChanges } from '../features/loginInput';
import { rxServices } from '../apis/services';
import { curry } from 'lodash';
import { getKikiStatistic$, getTransferPlatformStatistic$ } from './statistic';
import { PLATFORMS } from '../utils/constants';

export const initialFormValue = {
  email: 'cunghe@gmail.com',
  password: '123456',
};

export const initialTransferPlatformValue = {
  ...initialFormValue,
  platformToken: undefined,
  statistic: undefined,
  email: 'wgpjtgjpkwfhfv@eurokool.com',
  password: 'wgpjtgjpkwfhfv@eurokool.com',
};

function loginTransferPlatform(loginHelper$, change, state) {
  change({ ...state, isLoading: true });
  const platform = PLATFORMS.find((platform) => platform.name === state.platform);
  const login$ = loginHelper$(platform.loginUrl(), state).pipe(
    tap((data) => {
      console.log(data);
      change({ ...state, platformToken: data.data });
      setSession(data.data.token);
    }),
  );
  const statistic$ = getTransferPlatformStatistic$(login$, platform.getAllProfileUrl());
  return statistic$.subscribe((ch) => {
    console.log(ch);
    change({ ...state, password: '', isLoading: false, statistic: ch.data });
  });
}

function loginKiki(loginHelper$, change, state) {
  change({ ...state, isLoading: true });
  const login$ = loginHelper$(state).pipe(
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
