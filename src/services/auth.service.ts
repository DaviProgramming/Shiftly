import { UserRegistration } from '@/types/user.types';
import UserRepository from '@/repositories/user.repository';

export class AuthService {
  async register(user: UserRegistration) {
    const newUser = await UserRepository.create(user);

    return newUser;
  }
}

export default new AuthService();
