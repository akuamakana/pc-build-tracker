import routes from '@routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
require('dotenv-safe').config();

const app: Application = express();
const CORS_OPTIONS = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
};

// Logging, Cors, Parsing
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());

// Redis Session
export const redisClient = new Redis();
const RedisStore = connectRedis(session);
app.use(
  session({
    name: process.env.COOKIE_NAME,
    secret: process.env.COOKIE_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 * 10, httpOnly: true, secure: false, sameSite: 'lax' },
    saveUninitialized: false,
    resave: false,
    store: new RedisStore({ client: redisClient, disableTouch: true }),
  })
);

// Routes
app.get('/', async (_, res) => res.send('Hello from the server side'));
routes.auth(app);

export default app;
