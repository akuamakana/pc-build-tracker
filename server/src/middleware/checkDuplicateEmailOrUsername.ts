import { User } from '@entities/User';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.email) {
      res.status(400).send({ field: 'email', message: 'Email is required' });
      return;
    }

    if (!req.body.email.includes('@')) {
      res.status(400).send({ field: 'email', message: 'Invalid email' });
      return;
    }

    if (!req.body.username) {
      res.status(400).send({ field: 'username', message: 'Username is required' });
      return;
    }

    if (req.body.username..includes('@')) {
      res.status(400).send({ field: 'username', message: 'Username must be at least 3 characters long' });
      return;
    }

    const userRepository = getRepository(User);

    let userRepository = getRepository(User);
    let user = await userRepository.findOne({ email: req.body.email });

    if (user) {
      res.status(400).send({ field: 'email', message: 'Email is already in use.' });
      return;
    }

    user = await userRepository.findOne({ username: req.body.username });
    if (user) {
      res.status(400).send({ field: 'username', message: 'Username is already taken.' });
      return;
    }

    next();
  } catch (error) {
    // istanbul ignore next
    res.status(500).send({ field: 'alert', message: error.message });
  }
};
