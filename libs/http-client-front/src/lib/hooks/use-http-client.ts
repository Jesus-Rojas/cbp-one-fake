import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { IHttpClient } from '../types/http-client';
import { IHttpClientConfig } from '../types/http-client-config';
import { RequestError } from '../types/request-error';

export function useHttpClient(props: IHttpClientConfig = {}): IHttpClient {
  const { config, onError } = props;
  const [requestError, setRequestError] = useState<RequestError | undefined>(
    undefined,
  );
  const instance = axios.create(config);

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => handleError(error),
  );

  async function handleError(error: AxiosError) {
    const { response } = error;
    onError?.(error);
    if (response?.status === 401) {
      return setRequestError({
        statusCode: response.status,
        message: `Unathorized, make sure you're currently logged in`,
      });
    }

    if (response?.status && response.status >= 500) {
      return setRequestError({
        statusCode: response.status,
        message: 'Server error',
      });
    }
    setRequestError(
      response
        ? { statusCode: response.status, message: response.statusText }
        : undefined,
    );
    return Promise.reject(error);
  }

  async function handleResponse<T>(response: AxiosResponse<T>) {
    setRequestError(undefined);
    return Promise.resolve(response.data);
  }

  async function get<T>(url: string, query?: Record<string, string>) {
    const params = new URLSearchParams(query);
    return instance.get<T>(url, { params }).then(handleResponse);
  }

  async function post<T>(url: string, body?: object) {
    return instance.post<T>(url, body).then(handleResponse);
  }

  async function put<T>(url: string, body?: object) {
    return instance.put<T>(url, body).then(handleResponse);
  }

  async function deleteRequest<T>(url: string) {
    return instance.delete<T>(url).then(handleResponse);
  }

  return {
    requestError,
    get,
    post,
    put,
    delete: deleteRequest,
  };
}
