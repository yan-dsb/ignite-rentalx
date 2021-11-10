import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@modules/accounts/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User with this e-mail already exists');
    }

    const passwordHashed = await this.hashProvider.generate(password);

    await this.usersRepository.create({
      name,
      password: passwordHashed,
      email,
      driver_license
    });
  }
}

export { CreateUserUseCase };
