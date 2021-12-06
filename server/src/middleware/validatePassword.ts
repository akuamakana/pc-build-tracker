import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.password) {
    return res.status(400).send({ field: 'password', message: 'Password is required' });
  }

  if (req.body.password.length < 4) {
    return res.status(400).send({ field: 'password', message: 'Password must be at least 4 characters' });
  }

  return next();
};
