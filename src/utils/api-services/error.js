import { isUnprocessableEntityError, isNotFoundError, isUnauthorizedError } from './error-types';

export class ErrorApi {
  constructor(response) {
    this.status = response.status;
    this.data = response.data;
    this.config = response.config;
  }
}

export class ErrorUtils {
  static handleError(err, options) {
    const {
      fn,
      isErrorInstanceFn,
      isNotErrorInstanceFn,
      isUnprocessableEntityErrorFn,
      isNotFoundErrorFn,
      isUnauthorizedErrorFn,
    } = options ?? {};
    if (err instanceof ErrorApi) {
      // do something
      isErrorInstanceFn && isErrorInstanceFn(err);
      if (isUnprocessableEntityError(err)) {
        isUnprocessableEntityErrorFn && isUnprocessableEntityErrorFn(err);
      }
      if (isNotFoundError(err)) {
        isNotFoundErrorFn && isNotFoundErrorFn(err);
      }
      if (isUnauthorizedError(err)) {
        isUnauthorizedErrorFn && isUnauthorizedErrorFn(err);
      }
    } else {
      isNotErrorInstanceFn && isNotErrorInstanceFn();
    }
    fn && fn();
  }
}
