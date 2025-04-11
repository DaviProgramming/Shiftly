import { InferSelectModel } from 'drizzle-orm';
import { users } from '@/db/schema/user.schema';

type User = InferSelectModel<typeof users>;

export class UserResource {
  static toJSON(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  static toCollection(users: User[]) {
    return users.map(user => this.toJSON(user));
  }
}
