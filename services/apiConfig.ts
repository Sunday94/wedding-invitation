const DEFAULT_API_BASE_URL = 'https://wedding-planner-backend.qaiyumjohari94.workers.dev';
const DEFAULT_CLIENT_ID = 'sarah-james-id';

const env = import.meta.env as Record<string, string | undefined>;

export const API_BASE_URL = (env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');
export const FRONTEND_CLIENT_ID = env.VITE_CLIENT_ID || DEFAULT_CLIENT_ID;

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
