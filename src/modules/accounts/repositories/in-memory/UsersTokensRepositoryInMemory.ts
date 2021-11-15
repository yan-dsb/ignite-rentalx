import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create({
    refresh_token,
    user_id,
    expires_date
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { refresh_token, user_id, expires_date });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIDAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    const userToken = this.usersTokens.find(
      userToken =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );

    return userToken;
  }

  async deleteByID(id: string): Promise<void> {
    const userTokenIndex = this.usersTokens.findIndex(
      userToken => userToken.id === id
    );

    this.usersTokens.slice(userTokenIndex, 1);
  }
}

export { UsersTokensRepositoryInMemory };
