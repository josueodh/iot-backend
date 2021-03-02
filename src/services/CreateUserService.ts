import { hash } from 'bcryptjs';
import AppError from 'errors/AppError';
import User from 'models/User';
import { getRepository } from 'typeorm';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUsersService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepositories = getRepository(User);

    const checkUserExists = await usersRepositories.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already user.');
    }

    const hashPassword = await hash(password, 8);

    const user = await usersRepositories.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepositories.save(user);

    return user;
  }
}

export default CreateUsersService;
