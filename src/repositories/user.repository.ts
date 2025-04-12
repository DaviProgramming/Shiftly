import { db } from '@/db/db.connection';
import { users } from '@/db/schema/user.schema';
import { eq } from 'drizzle-orm';

export class UserRepository {
  async findByEmail(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async create(data: { name: string; email: string; password_hash: string; role: string }) {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  async findById(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
}

export default new UserRepository();
