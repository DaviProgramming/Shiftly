import express, { ErrorRequestHandler, RequestHandler } from 'express';
import routes from '@/routes/router';
import { errorHandler, notFoundHandler } from '@/middlewares/error-handler.middleware';
import appConfig from '@/configs/app.config';
import { logger } from '@/utils/logger.utils';
import { apiLimiter } from '@/middlewares/rate-limit.middleware';

const app = express();

app.use(express.json());

app.use(apiLimiter);

app.use(routes);

app.use(notFoundHandler as RequestHandler);

app.use(errorHandler as ErrorRequestHandler);

app.listen(appConfig.port, () => {
  logger.info('🚀 Servidor iniciado com sucesso!');
  logger.info(`📡 URL: http://localhost:${appConfig.port}`);
  logger.info(`⏰ Iniciado em: ${new Date().toLocaleString()}`);
});
