import { logger } from '@/utils/logger.utils';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runSeed(seedFile: string): Promise<void> {
  try {
    logger.info(`Executando seed: ${seedFile}...`);
    await execAsync(`ts-node src/db/seeds/${seedFile}`);
    logger.info(`Seed ${seedFile} concluído com sucesso!`);
  } catch (error) {
    logger.info(`Erro ao executar seed ${seedFile}: ${error}`);
    throw error;
  }
}

async function runAllSeeds(): Promise<void> {
  try {
    logger.info('Iniciando execução de todas as seeds...');
    
    await runSeed('user.seeds.ts');
    await runSeed('time-entry.seeds.ts');
    
    logger.info('Todas as seeds foram executadas com sucesso!');
  } catch (error) {
    logger.info(`Erro durante a execução das seeds: ${error}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runAllSeeds();
}

export { runAllSeeds }; 