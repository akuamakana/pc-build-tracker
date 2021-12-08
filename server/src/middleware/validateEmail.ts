import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    res.status(400).send({ field: 'email', message: 'Email is required' });
    return;
  }

  if (!req.body.email.includes('@')) {
    res.status(400).send({ field: 'email', message: 'Invalid email' });
    return;
  }

  next();
};
