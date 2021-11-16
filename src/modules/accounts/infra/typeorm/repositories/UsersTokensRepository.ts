import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    refresh_token,
    expires_date
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIDAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    const userToken = this.repository.findOne({
      where: { user_id, refresh_token }
    });

    return userToken;
  }

  async deleteByID(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    const userToken = await this.repository.findOne({ refresh_token });

    return userToken;
  }
}

export { UsersTokensRepository };
