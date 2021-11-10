import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { name, email, password, driver_license });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }
  async findByID(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }
  async update({
    id,
    name,
    email,
    password,
    driver_license,
    avatar
  }: IUpdateUserDTO): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex < 0) {
      return;
    }

    const user = {
      ...this.users[userIndex],
      ...{ id, name, email, password, driver_license, avatar }
    };

    this.users[userIndex] = user;
  }
}

export { UsersRepositoryInMemory };
