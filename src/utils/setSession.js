import http from './api-services/http';

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    http.sso.setAuthorization(accessToken);
    http.client.setAuthorization(accessToken);
  } else {
    localStorage.removeItem('accessToken');
    http.sso.clearAuthorization();
    http.client.clearAuthorization();
  }
};

const setSessionLocal = (accessToken) => {
  http.local.setAuthorization(accessToken);
};

const setSessionInfo = (data) => {
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  } else {
    localStorage.removeItem('userInfo');
  }
};

export { setSession, setSessionInfo, setSessionLocal };
