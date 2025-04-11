import { UserRegistration, UserLogin } from '@/types/user.types';
import UserRepository from '@/repositories/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NotFoundError, UnauthorizedError } from '@/utils/app.error';
import appConfig from '@/configs/app.config';

export class AuthService {
  async login(user: UserLogin) {
    const findUser = await UserRepository.findByEmail(user.email);

    if (!findUser) {
      throw new NotFoundError('User not found');
    }

    const isPasswordValid = await bcrypt.compare(user.password, findUser.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Credentials are invalid');
    }

    const token = jwt.sign({ userId: findUser.id }, appConfig.jwtSecret, { expiresIn: '1h' });

    return { user: findUser, token };
  }

  async register(user: UserRegistration) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    const newUser = await UserRepository.create({ ...user, password_hash: passwordHash });

    return newUser;
  }
}

export default new AuthService();
