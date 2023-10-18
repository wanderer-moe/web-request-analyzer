import { Hono } from 'hono';
import { UAParser } from 'ua-parser-js';
import { logger } from 'hono/logger';
import { LogTime } from './lib/helpers/timeTaken';

const app = new Hono();

app.use('*', async (c, next) => {
    logger(), LogTime(c, next);
});

app.get('/', async (ctx) => {
    const cloudflareHeaders = {
        ip: ctx.req.header('cf-connecting-ip'),
        country: ctx.req.header('cf-ipcountry'),
        ray: ctx.req.header('cf-ray'),
        host: ctx.req.header('host'),
        colo: ctx.req.raw.cf?.colo,
    };

    const userAgentInfo = {
        userAgent: new UAParser(ctx.req.header('user-agent')).getResult(),
        doNotTrack: ctx.req.header('dnt'),
        accept: ctx.req.header('accept'),
    };

    return ctx.json(
        {
            status: 'ok',
            details: { cloudflare: cloudflareHeaders, user: userAgentInfo },
        },
        200,
    );
});

app.onError((err, ctx) => {
    return ctx.json(
        {
            status: 'error',
            error: err.message,
        },
        500,
    );
});

export default app;
