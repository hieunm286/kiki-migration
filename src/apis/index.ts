import http from '../utils/api-services/http.js';

async function loginKiki(data) {
  return http.sso.post('/user/login', { ...data, serviceCode: 'kikilogin' });
}

export const apiServices = {
  loginKiki,
};
