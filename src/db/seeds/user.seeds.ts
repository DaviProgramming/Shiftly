import { db } from '../db.connection';
import { users } from '../schema/user.schema';
import { hash } from 'bcrypt';
import { logger } from '../../utils/logger.utils';

async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

async function seed() {
  try {
    logger.info('Iniciando seed de usuários...');

    const adminPasswordHash = await hashPassword('admin123');
    const funcionarioPasswordHash = await hashPassword('funcionario123');

    await db.insert(users).values([
      {
        name: 'Administrador',
        email: 'admin@shiftly.com',
        password_hash: adminPasswordHash,
        role: 'admin',
      },
      {
        name: 'Funcionário Exemplo',
        email: 'funcionario@shiftly.com',
        password_hash: funcionarioPasswordHash,
        role: 'employee',
      },
    ]);

    logger.info('Seed de usuários concluído com sucesso!');
  } catch (error) {
    logger.info(`Erro ao executar seed de usuários: ${error}`);
  }
}

seed();
