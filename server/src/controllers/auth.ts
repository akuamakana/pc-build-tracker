import { User } from '@entities/User';
import { getRepository } from 'typeorm';
import * as argon2 from 'argon2';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = new User();

    console.log('req: ', req.body);
    user.username = req.body.username;
    user.password = await argon2.hash(req.body.password);
    user.email = req.body.email;

    await userRepository.save(user);
    res.status(201).send(true);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const selection = req.body.usernameOrEmail.includes('@') ? { email: req.body.usernameOrEmail } : { username: req.body.usernameOrEmail };
    const user = await userRepository.createQueryBuilder('User').select(['User.username', 'User.id']).addSelect('User.password').where(selection).getOne();

    if (!user) {
      res.status(404).send({ field: 'usernameOrEmail', message: 'User not found' });
      return;
    }

    // Verify password
    const validPassword = await argon2.verify(user.password, req.body.password);
    if (!validPassword) {
      res.status(401).send({ field: 'password', message: 'Invalid password' });
      return;
    }

    req.session.userId = user.id;
    res.cookie('userId', user.id, { maxAge: 24 * 60 * 60 * 60 * 60, httpOnly: true, sameSite: 'lax' });
    res.status(200).send(true);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
