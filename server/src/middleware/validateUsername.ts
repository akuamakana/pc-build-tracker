import { NextFunction, Request, Response } from 'express';
export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.username) {
    res.status(400).send({ field: 'username', message: 'Username is required' });
    return;
  }

  if (req.body.username.includes('@')) {
    res.status(400).send({ field: 'username', message: 'Username cannot contain @' });
    return;
  }

  if (req.body.username.length < 4) {
    res.status(400).send({ field: 'username', message: 'Username must be at least 4 characters long' });
    return;
  }

  next();
};
