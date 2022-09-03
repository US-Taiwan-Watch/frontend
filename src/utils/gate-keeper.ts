export const isDev = process.env.NODE_ENV === 'development';

export const isLocal = isDev || !!process.env.NEXT_PUBLIC_BASE_URL?.includes('localhost');
