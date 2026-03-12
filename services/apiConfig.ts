const PRODUCTION_API_BASE_URL = 'https://wedding-planner-backend.qaiyumjohari94.workers.dev';

const env = import.meta.env as Record<string, string | undefined>;
const isLocalHost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const DEFAULT_API_BASE_URL = isLocalHost ? 'http://localhost:8787' : PRODUCTION_API_BASE_URL;

export const API_BASE_URL = (env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');
const getClientIdFromUrl = (): string => {
    if (typeof window === 'undefined') return '';
    const urlClientId = new URLSearchParams(window.location.search).get('client_id');
    return typeof urlClientId === 'string' ? urlClientId.trim() : '';
};
export const FRONTEND_CLIENT_ID = (env.VITE_CLIENT_ID || '').trim() || getClientIdFromUrl();

export const buildApiUrl = (
    path: string,
    params?: Record<string, string | number | boolean | null | undefined>
): string => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(`${API_BASE_URL}${normalizedPath}`);
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        url.searchParams.set(key, String(value));
    });
    return url.toString();
};
