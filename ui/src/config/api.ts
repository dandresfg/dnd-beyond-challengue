import { ofetch } from 'ofetch';

export const API_BASE_URL = 'http://localhost:3000/api';

export const fetcher = (url: string) =>
  ofetch(url, {
    method: 'GET',
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const Api = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: (url: string, data: Record<string, any>) =>
    ofetch(url, {
      method: 'POST',
      body: data,
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
};
