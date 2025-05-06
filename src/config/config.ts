import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        enviroment: {
            mode: process.env.NODE_ENV,
            port: process.env.PORT,
            timeout: process.env.TIME_OUT,
        },
        policies: {
            cors: {
                origin: process.env.ORIGIN_CORS,
            },
            throttler: {
                rateLimit: process.env.REQUEST_RATE_LIMIT,
                timeToLive: process.env.REQUEST_TIME_TO_LIVE,
            },
        }
    }
});
