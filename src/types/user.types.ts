import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from '@db/schema/user.schema';
import { Roles } from '@enums/roles.enum';

export type User = InferSelectModel<typeof users>;


export type NewUser = InferInsertModel<typeof users>;


export type SafeUser = Omit<User, 'password_hash'>;

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegistration = {
  name: string;
  email: string;
  password: string;
  role?: Roles;
};
