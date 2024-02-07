declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            FASTIFY_CLOSE_GRACE_DELAY?: number;
            PORT?: number;
            HOST?: string;
        }
    }
}

export {};
