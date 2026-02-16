import { ofetch } from 'ofetch';

const baseURL = 'http://localhost:4321';

async function post<T>(url: string, body: Record<string, unknown>): Promise<T> {
  return ofetch<T>(url, { baseURL, method: 'POST', body });
}

export const api = {
  dealDamage: (slug: string, damageType: string, amount: number) =>
    post(`/characters/${slug}/damage`, { damageType, amount }),
  heal: (slug: string, amount: number) =>
    post(`/characters/${slug}/heal`, { amount }),
  addTempHp: (slug: string, amount: number) =>
    post(`/characters/${slug}/temp-hp`, { amount }),
};
