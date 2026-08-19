export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const headers = new Headers(init?.headers as HeadersInit || {});

  // Ensure JSON content-type for body payloads unless explicitly set
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  try {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('hamrah_token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }
  } catch (e) {
    // ignore storage errors
  }

  const res = await fetch(input, { ...(init || {}), headers });
  return res;
}
