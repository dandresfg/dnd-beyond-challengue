import { ofetch } from "ofetch";

export const API_BASE_URL = 'http://localhost:3000/api';

export const fetcher = (url: string) => ofetch(url, {
    method: 'GET',
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})