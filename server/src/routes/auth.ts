import { login, register } from '@controllers/auth';
import { Application } from 'express';

const authRoute = (app: Application) => {
  app.post('/auth/register', register);

  app.post('/auth/login', login);
};

export default authRoute;
