import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

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
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    request.user = {
      id: user_id
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
