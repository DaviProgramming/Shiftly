import { db } from '@/db/db.connection';
import { timeEntries } from '@/db/schema/times-entries.schema';
import { users } from '@/db/schema/user.schema';
import { logger } from '@/utils/logger.utils';
import { eq } from 'drizzle-orm';

async function seed() {
  try {
    logger.info('Iniciando seed de entradas de tempo...');

    const funcionario = await db.query.users.findFirst({
      where: eq(users.email, 'funcionario@shiftly.com'),
    });

    if (!funcionario) {
      logger.info('Usuário funcionário não encontrado. Execute a seed de usuários primeiro.');
      return;
    }

    const now = new Date();

    const entrada = new Date(now);
    entrada.setHours(8, 0, 0, 0);

    const saidaAlmoco = new Date(now);
    saidaAlmoco.setHours(12, 0, 0, 0);

    const entradaAlmoco = new Date(now);
    entradaAlmoco.setHours(13, 0, 0, 0);

    const saida = new Date(now);
    saida.setHours(17, 0, 0, 0);

    const timeEntriesData = [];

    timeEntriesData.push(
      {
        user_id: funcionario.id,
        type: 'entrada',
        timestamp: entrada,
        latitude: -23.5505,
        longitude: -46.6333,
      },
      {
        user_id: funcionario.id,
        type: 'saida_almoco',
        timestamp: saidaAlmoco,
        latitude: -23.5505,
        longitude: -46.6333,
      },
      {
        user_id: funcionario.id,
        type: 'entrada_almoco',
        timestamp: entradaAlmoco,
        latitude: -23.5505,
        longitude: -46.6333,
      },
      {
        user_id: funcionario.id,
        type: 'saida',
        timestamp: saida,
        latitude: -23.5505,
        longitude: -46.6333,
      }
    );

    for (let i = 1; i <= 5; i++) {
      const dia = new Date(now);
      dia.setDate(dia.getDate() - i);

      if (dia.getDay() === 0 || dia.getDay() === 6) continue;

      const entradaDia = new Date(dia);
      entradaDia.setHours(8, 0, 0, 0);

      const saidaAlmocoDia = new Date(dia);
      saidaAlmocoDia.setHours(12, 0, 0, 0);

      const entradaAlmocoDia = new Date(dia);
      entradaAlmocoDia.setHours(13, 0, 0, 0);

      const saidaDia = new Date(dia);
      saidaDia.setHours(17, 0, 0, 0);

      timeEntriesData.push(
        {
          user_id: funcionario.id,
          type: 'entrada',
          timestamp: entradaDia,
          latitude: -23.5505,
          longitude: -46.6333,
        },
        {
          user_id: funcionario.id,
          type: 'saida_almoco',
          timestamp: saidaAlmocoDia,
          latitude: -23.5505,
          longitude: -46.6333,
        },
        {
          user_id: funcionario.id,
          type: 'entrada_almoco',
          timestamp: entradaAlmocoDia,
          latitude: -23.5505,
          longitude: -46.6333,
        },
        {
          user_id: funcionario.id,
          type: 'saida',
          timestamp: saidaDia,
          latitude: -23.5505,
          longitude: -46.6333,
        }
      );
    }

    await db.insert(timeEntries).values(timeEntriesData);

    logger.info('Seed de entradas de tempo concluído com sucesso!');
  } catch (error) {
    logger.info(`Erro ao executar seed de entradas de tempo: ${error}`);
  }
}

seed();
