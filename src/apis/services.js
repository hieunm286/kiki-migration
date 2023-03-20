import http from '../utils/api-services/http';

const loginKiki$ = (data) => {
  console.log(http);
  return http.sso.post$('/user/login', { ...data, serviceCode: 'kikilogin' });
};

const loginTransferPlatform$ = (data) => {
  return http.sso.post$('/user/login', { ...data, serviceCode: 'kikilogin' });
};

export const rxServices = {
  loginKiki$,
  loginTransferPlatform$,
};
