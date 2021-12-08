import { User } from '@entities/User';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {

    const userRepository = getRepository(User);
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
