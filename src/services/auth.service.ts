import { UserRegistration } from '@/types/user.types';
import UserRepository from '@/repositories/user.repository';
import bcrypt from 'bcrypt';

export class AuthService {
  async register(user: UserRegistration) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    const newUser = await UserRepository.create({ ...user, password_hash: passwordHash });

    return newUser;
  }
}

export default new AuthService();
