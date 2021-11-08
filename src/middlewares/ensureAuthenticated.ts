import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';
import { AppError } from '../shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      `${process.env.JWT_SECRET}`
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
