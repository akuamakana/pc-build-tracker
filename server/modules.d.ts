import session from 'express-session';
declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: number;
    TYPEORM_HOST: string;
    TYPEORM_PORT: number;
    TYPEORM_USERNAME: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_DATABASE: string;
    TYPEORM_LOGGING: boolean;
    COOKIE_NAME: string;
    COOKIE_SECRET: string;
  }
}

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}
