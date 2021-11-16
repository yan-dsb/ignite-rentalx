import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string): Promise<ITokenResponse> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
      secret_token,
      expires_in_token
    } = auth;

    const { sub: user_id, email } = verify(
      refresh_token,
      secret_refresh_token
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIDAndRefreshToken(
        user_id,
        refresh_token
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exists');
    }

    await this.usersTokensRepository.deleteByID(userToken.id);

    const new_refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token
    });

    const expires_date = this.dateProvider.addDays(
      expires_in_refresh_token_days
    );

    await this.usersTokensRepository.create({
      refresh_token: new_refresh_token,
      expires_date,
      user_id
    });

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token
    });

    return {
      token: newToken,
      refresh_token: new_refresh_token
    };
  }
}

export { RefreshTokenUseCase };
