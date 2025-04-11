import express, { ErrorRequestHandler, RequestHandler } from 'express';
import routes from '@/routes/routes';
import { errorHandler, notFoundHandler } from '@/middlewares/error-handler.middleware';

const app = express();

app.use(express.json());

app.use(routes);

app.use(notFoundHandler as RequestHandler);

app.use(errorHandler as ErrorRequestHandler);

app.listen(3333, () => 'server running on port 3333');
