import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@modules/accounts/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
  password_confirm: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    token,
    password,
    password_confirm
  }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError('Token invalid');
    }

    const dateNow = this.dateProvider.dateNow();

    const isBeforeDate = this.dateProvider.isBefore(
      userToken.expires_date,
      dateNow
    );

    if (isBeforeDate) {
      throw new AppError('Token expired');
    }

    if (password !== password_confirm) {
      throw new AppError('Password confirmation does match with new password');
    }

    const user = await this.usersRepository.findByID(userToken.user_id);

    const passwordHashed = await this.hashProvider.generate(password);

    user.password = passwordHashed;

    await this.usersRepository.update(user);

    await this.usersTokensRepository.deleteByID(userToken.id);
  }
}
export { ResetPasswordUseCase };
