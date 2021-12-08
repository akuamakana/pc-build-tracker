import { login, register } from '@controllers/auth';
import checkDuplicateEmailOrUsername from '@middleware/checkDuplicateEmailOrUsername';
import validatePassword from '@middleware/validatePassword';
import validateEmail from '@middleware/validateEmail';
import validateUsername from '@middleware/validateUsername';
import { Application } from 'express';

const authRoute = (app: Application) => {
  app.post('/auth/register', [validateEmail, validateUsername, checkDuplicateEmailOrUsername, validatePassword], register);

  app.post('/auth/login', login);
};

export default authRoute;
