import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  res.send('Hello World');
});

router.post('/register', (req: Request, res: Response) => {
  res.send('Hello World');
});

export default router;