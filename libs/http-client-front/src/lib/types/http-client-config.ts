import { AxiosError, CreateAxiosDefaults } from 'axios';

export interface IHttpClientConfig {
  config?: CreateAxiosDefaults;
  onError?: (error: AxiosError) => void;
}
