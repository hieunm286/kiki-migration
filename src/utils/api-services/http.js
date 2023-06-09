import axios from 'axios';
import { ErrorApi } from './error';
import { apiKikiUrl, apiSSOEndpoints } from '../configs';
import { defer } from 'rxjs';

export class HttpClient {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
    });

    this.configResponseInterceptor();
  }

  configResponseInterceptor() {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  }
  handleResponse(response) {
    const { data } = response;
    if (data && (data.success === false || data.success === 'false')) {
      return Promise.reject(new ErrorApi(response));
    }

    return Promise.resolve(data);
  }

  handleError(error) {
    if (!error.response) return Promise.reject(error);
    return Promise.reject(new ErrorApi(error.response));
  }

  setAuthorization(accessToken) {
    this.instance.defaults.headers.common.authorization = accessToken;
  }

  clearAuthorization() {
    delete this.instance.defaults.headers.common.authorization;
  }

  get(url, params, config) {
    return this.instance({
      method: 'GET',
      url,
      params,
      ...config,
    });
  }

  post(url, data, config) {
    return this.instance({
      method: 'POST',
      url,
      data,
      ...config,
    });
  }

  put(url, data, config) {
    return this.instance({
      method: 'PUT',
      url,
      data,
      ...config,
    });
  }

  delete(url, config) {
    return this.instance({
      method: 'DELETE',
      url,
      ...config,
    });
  }

  post$(url, data) {
    return defer(() =>
      this.instance({
        method: 'post',
        url,
        data,
      }),
    );
  }

  get$(url, params) {
    return defer(() =>
      this.instance({
        method: 'get',
        url,
        params,
      }),
    );
  }
}

const axiosSSO = new HttpClient(apiSSOEndpoints);
const axiosClient = new HttpClient(apiKikiUrl);
const axiosLocal = new HttpClient('http://localhost:8000');

const http = {
  sso: axiosSSO,
  client: axiosClient,
  local: axiosLocal,
};

export default http;
