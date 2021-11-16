import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProvider
    );
  });

  it('shoul be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      email: 'test@example.com',
      password: '123456',
      driver_license: 'TEST423',
      name: 'test'
    });

    await sendForgotPasswordMailUseCase.execute('test@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('shoul not be able to send a forgot password mail to non-existent user', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('test@example.com')
    ).rejects.toEqual(new AppError('User does not exists'));
  });

  it('shoul be able to create a users token', async () => {
    const createMailToken = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      email: 'test@example.com',
      password: '123456',
      driver_license: 'TEST423',
      name: 'test'
    });

    await sendForgotPasswordMailUseCase.execute('test@example.com');

    expect(createMailToken).toHaveBeenCalled();
  });
});
