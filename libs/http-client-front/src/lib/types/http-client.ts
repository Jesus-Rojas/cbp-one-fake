import { RequestError } from './request-error';

export interface IHttpClient {
  requestError: RequestError | undefined;
  get<T>(url: string, query?: Record<string, string>): Promise<T>;
  post<T>(url: string, body?: object): Promise<T>;
  put<T>(url: string, body?: object): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
