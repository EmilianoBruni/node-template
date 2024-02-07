import type { AutoloadPluginOptions } from '@fastify/autoload';

export type AppOptions = {
    trustProxy: boolean;
    logger:
        | boolean
        | {
              level: string;
              transport: {
                  target: string;
                  options: Record<string, string | boolean>;
              };
          };
    ajv: { customOptions: Record<string, boolean> };
    maxParamLength: number;
} & Partial<AutoloadPluginOptions>;
