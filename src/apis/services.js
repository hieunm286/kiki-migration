import http from '../utils/api-services/http';
import { defer } from 'rxjs';
import { startTransfer, transferPromiseProgress } from '../hooks/useAppContext';

const loginKiki$ = (data) => {
  return http.sso.post$('/user/login', { ...data, serviceCode: 'kikilogin' });
};

const loginTransferPlatform$ = (url, data) => {
  if (data.platform === 'Dolphin') {
    return defer(() => Promise.resolve(data.platformToken));
  }
  return http.local.post$(url, data);
};

const getAllProfileTransferPlatform$ = (url, token) => {
  return http.local.post$(url, { token });
};

const kikiStatistic$ = () => {
  return http.client.get$('/statistic');
};

const transferProfiles$ = (url, data) => {
  return http.local.post$(url, data);
};

const transferringProgress$ = (url) => {
  return http.local.get$(url);
};

export const rxServices = {
  loginKiki$,
  loginTransferPlatform$,
  kikiStatistic$,
  transferProfiles$,
  transferringProgress$,
  getAllProfileTransferPlatform$,
};
