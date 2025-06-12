import { Router } from 'express';

const router = Router();

router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong from Accent Tech API ✅' });
});

export default router;
