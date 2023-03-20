import { BehaviorSubject, map, scan, tap } from 'rxjs';
import { setSession } from '../utils/setSession';
import { applyLoginInput, combineApplyChanges } from '../features/loginInput';
import { rxServices } from '../apis/services';
import { curry } from 'lodash';

export const initialFormValue = {
  email: 'cunghe@gmail.com',
  password: '123456',
};

export const initialTransferPlatformValue = {
  ...initialFormValue,
  platform: undefined,
};

function doLogin(loginHelper$, change, state) {
  change({ ...state, isLoading: true });
  return loginHelper$(state)
    .pipe(
      tap((data) => {
        console.log(data);
        change({ ...state, isLoading: false });
      }),
    )
    .subscribe((ch) => {
      console.log(ch);
      setSession(ch.data.token);
      change({ ...state, password: '', loginData: ch.data });
    });
}

function doLogout(change) {
  setSession(undefined);
  change({ ...initialFormValue, loginData: undefined });
}

function addTransitions(loginHelper$, change, state) {
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
    onLogin: () => doLogin(loginHelper$, change, state),
    logout: () => doLogout(change),
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
