import http from '../utils/api-services/http';

async function loginKiki(data) {
  return http.sso.post('/user/login', { ...data, serviceCode: 'kikilogin' });
}

export const apiServices = {
  loginKiki,
};
