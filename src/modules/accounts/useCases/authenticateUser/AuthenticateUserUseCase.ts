import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IHashProvider } from '../../providers/HashProvider/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email/password credentials');
    }

    const passwordMatches = await this.hashProvider.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      throw new AppError('Invalid email/password credentials');
    }

    const token = sign({}, `${process.env.JWT_SECRET}`, {
      subject: user.id,
      expiresIn: '1d'
    });

    return token;
  }
}

export { AuthenticateUserUseCase };
