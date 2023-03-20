import { HttpStatusCode } from 'axios';

// Check if error status code is 401
export const isUnauthorizedError = (error) => {
  return error.data.code === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Unauthorized;
};

// Check if error status code is 422
export const isUnprocessableEntityError = (error) =>
  error.data.code === HttpStatusCode.UnprocessableEntity || error.status === HttpStatusCode.UnprocessableEntity;

// Check if error status code is 404
export const isNotFoundError = (error) =>
  error.data.code === HttpStatusCode.NotFound || error.status === HttpStatusCode.NotFound;
