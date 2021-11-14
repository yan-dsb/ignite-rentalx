import { HashProviderInMemory } from '@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProviderInMemory
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      hashProviderInMemory
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = {
      name: 'User test',
      email: 'test@example.com',
      password: '123456',
      driver_license: '123'
    };
    await createUserUseCase.execute(user);

    const authResponse = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(authResponse).toHaveProperty('token');
  });

  it('should not be able to authenticate a non-existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'non-existing@mail.com',
        password: '123456'
      })
    ).rejects.toEqual(new AppError('Invalid email/password credentials'));
  });

  it('should not be able to authenticate a user with incorrect password', async () => {
    const user = {
      name: 'User test',
      email: 'test@example.com',
      password: '123456',
      driver_license: '123'
    };
    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect-password'
      })
    ).rejects.toEqual(new AppError('Invalid email/password credentials'));
  });
});
