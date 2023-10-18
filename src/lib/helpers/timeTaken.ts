import type { Context, Next } from 'hono';

export async function LogTime(c: Context, next: Next): Promise<void> {
    const start = Date.now();
    await next();
    c.res.headers.set('x-response-time', `${Date.now() - start}ms`);
}
