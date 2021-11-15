import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIDAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined>;
  deleteByID(id: string): Promise<void>;
}

export { IUsersTokensRepository };
