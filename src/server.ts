import express, { ErrorRequestHandler, RequestHandler } from 'express';
import routes from '@/routes/routes';
import { errorHandler, notFoundHandler } from '@/middlewares/error-handler.middleware';
import appConfig from '@/configs/app.config';
import { logger } from '@/utils/logger.utils';

const app = express();

app.use(express.json());

app.use(routes);

app.use(notFoundHandler as RequestHandler);

app.use(errorHandler as ErrorRequestHandler);

app.listen(appConfig.port, () => {
  logger.info('🚀 Servidor iniciado com sucesso!');
  logger.info(`📡 URL: http://localhost:${appConfig.port}`);
  logger.info(`⏰ Iniciado em: ${new Date().toLocaleString()}`);
});
