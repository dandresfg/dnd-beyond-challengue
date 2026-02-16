import { ofetch } from "ofetch";

export const fetcher = (url: string) => ofetch(url, {
    method: 'GET',
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
})