// Couche d'accès à l'API TRACE.
// En dev comme en prod, on appelle /api en relatif (proxy Vite / nginx).

const DEMO_USER = '11111111-1111-1111-1111-111111111111';

async function req(path, options) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Erreur API (${res.status})`);
  return res.json();
}

export const api = {
  match: (profile) => req('/api/match', { method: 'POST', body: JSON.stringify(profile) }),
  tyres: () => req('/api/tyres'),
  garage: () => req(`/api/garage/${DEMO_USER}`),
  alerts: () => req(`/api/garage/${DEMO_USER}/alerts`),
  retailers: (tyreId) => req(`/api/retailers/${tyreId}`),
  order: (payload) => req('/api/orders', {
    method: 'POST',
    body: JSON.stringify({ userId: DEMO_USER, ...payload }),
  }),
};

export { DEMO_USER };
